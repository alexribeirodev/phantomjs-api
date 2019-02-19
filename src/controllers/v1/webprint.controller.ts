import { ExpressResponseDefault } from "../../../utils/ExpressResponseDefault";
import express = require("express");
import { Webshot, WebshotConfig } from "../../../utils/Webshot";
import * as request from "request";

interface RedirectInterface {
  url: string;
  method: string;
  headers?: object;
  customKey?: string;
  customObject?: object;
}

export class WebprintController {
  constructor() {}

  static generate(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    if (!("url" in req.query || "url" in req.body)) {
      next(new Error("url é um parâmetro necessário!"));
    } else {
      const webshot: Webshot = new Webshot();

      const data = {
        ...req.query,
        ...req.body
      };

      if (!("width" in data)) {
        data.width = 1024;
      }

      if (!("height" in data)) {
        data.height = 768;
      }

      const config: WebshotConfig = {
        url: data.url,
        height: data.height,
        width: data.width
      };

      config.options = data;

      webshot
        .generate(config)
        .then((base64: string) => {
          if (!("redirect" in data)) {
            ExpressResponseDefault.code200(req, res, next, {
              base64
            });
          } else {
            let redirect: RedirectInterface = data.redirect;
            let obj = {};

            if (redirect.customObject) {
              obj = redirect.customObject;
            }

            if (redirect.customKey) {
              obj[redirect.customKey] = base64;
            } else {
              obj["base64"] = base64;
            }

            request(
              {
                url: redirect.url,
                method: "post",
                headers: redirect.headers || {},
                body: obj,
                json: true
              },
              (err, response, body) => {
                if (err) {
                  next(err);
                }

                console.log(redirect.url, body);

                ExpressResponseDefault.code200(req, res, next, {
                  redirect: true,
                  result: body,
                  base64
                });
              }
            );
          }
        })
        .catch(err => {
          next(new Error(err));
        });
    }
  }

  static teste(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    let obj = {
      body: req.body,
      query: req.query,
      headers: req.headers
    };

    console.log("Teste", obj);

    ExpressResponseDefault.code200(req, res, next, {
      obj
    });
  }
}

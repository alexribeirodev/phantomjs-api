import { ExpressResponseDefault } from "../../../utils/ExpressResponseDefault";
import express = require("express");
import { Webshot, WebshotConfig } from "../../../utils/Webshot";

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
          ExpressResponseDefault.code200(req, res, next, {
            base64
          });
        })
        .catch(err => {
          next(new Error(err));
        });
    }
  }
}

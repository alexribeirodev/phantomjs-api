import * as express from "express";
import JWT from "../../utils/JWT";
import { ExpressResponseDefault } from "../../utils/ExpressResponseDefault";

export class AuthMiddleware {
  constructor() {}

  static validToken(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    const token = req.query.token || req.body.token || req.get("token") || req.get("TOKEN") || null;

    if (token) {
      const jwt = new JWT();

      jwt
        .decodeToken(token)
        .then(data => {
          req["tokeDecoded"] = data;

          next();
        })
        .catch(err => {
          ExpressResponseDefault.code500(err, req, res, next);
        });
    } else {
      ExpressResponseDefault.code401(
        req,
        res,
        next,
        "É necessário passar o token."
      );
    }
  }
}

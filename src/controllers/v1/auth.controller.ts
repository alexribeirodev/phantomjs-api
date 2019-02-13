import { ExpressResponseDefault } from "../../../utils/ExpressResponseDefault";
import express = require("express");
import JWT from "../../../utils/JWT";

export class AuthController {
  constructor() {}

  static login(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    const jwt = new JWT();

    ExpressResponseDefault.code200(req, res, next, {
      token: jwt.genToken(req.body)
    });
  }
}

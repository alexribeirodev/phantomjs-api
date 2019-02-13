import * as express from "express";

export class ExpressResponseDefault {
  constructor() {}

  static code200(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction,
    data: any,
    message: string = null
  ) {
    res.status(200).json({
      message: message || "Requisição bem sucedida.",
      data: data
    });
  }

  static code500(
    err: any,
    req: express.Request,
    res: express.Response,
    next: express.NextFunction,
    message: string = null
  ) {
    res.status(500).json({
      message: message || "Houve um erro na requisição.",
      error: err
    });
  }

  static code401(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction,
    message: string = null
  ) {
    res.status(401).json({
      message: message || "Autenticação necessária."
    });
  }

  static code403(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction,
    message: string = null
  ) {
    res.status(403).json({
      message: message || "Acesso proibido."
    });
  }

  static code404(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction,
    message: string = null
  ) {
    res.status(404).json({
      message: message || "Não foi possível encontrar essa rota."
    });
  }
}

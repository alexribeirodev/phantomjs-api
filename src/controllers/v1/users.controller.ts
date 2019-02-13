import { UserModel, User } from "../../models/v1/users.model";
import { ExpressResponseDefault } from "../../../utils/ExpressResponseDefault";
import express = require("express");

export class UserController {
  static users: User = new User();
  constructor() {
    console.log(this);
    UserController.users = new User();
  }

  static getAll(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    UserController.users
      .getAll()
      .then(data => {
        ExpressResponseDefault.code200(req, res, next, data);
      })
      .catch(err => {
        next(new Error(err));
      });
  }

  static getById(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    UserController.users
      .getById(req.params.id)
      .then(data => {
        ExpressResponseDefault.code200(req, res, next, data);
      })
      .catch(err => {
        next(new Error(err));
      });
  }

  static create(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    delete req.body.token;
    UserController.users
      .create(req.body)
      .then(data => {
        ExpressResponseDefault.code200(req, res, next, data);
      })
      .catch(err => {
        next(new Error(err));
      });
  }

  static edit(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    console.log(req.params.id);
    req.body.id = req.params.id;
    delete req.body.token;
    UserController.users
      .edit(req.params.id, req.body)
      .then(data => {
        ExpressResponseDefault.code200(req, res, next, data);
      })
      .catch(err => {
        next(new Error(err));
      });
  }

  static delete(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    UserController.users
      .delete(req.params.id)
      .then(data => {
        ExpressResponseDefault.code200(req, res, next, data);
      })
      .catch(err => {
        next(new Error(err));
      });
  }
}

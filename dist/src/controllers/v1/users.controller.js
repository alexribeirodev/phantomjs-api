"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const users_model_1 = require("../../models/v1/users.model");
const ExpressResponseDefault_1 = require("../../../utils/ExpressResponseDefault");
class UserController {
    constructor() {
        console.log(this);
        UserController.users = new users_model_1.User();
    }
    static getAll(req, res, next) {
        UserController.users
            .getAll()
            .then(data => {
            ExpressResponseDefault_1.ExpressResponseDefault.code200(req, res, next, data);
        })
            .catch(err => {
            next(new Error(err));
        });
    }
    static getById(req, res, next) {
        UserController.users
            .getById(req.params.id)
            .then(data => {
            ExpressResponseDefault_1.ExpressResponseDefault.code200(req, res, next, data);
        })
            .catch(err => {
            next(new Error(err));
        });
    }
    static create(req, res, next) {
        delete req.body.token;
        UserController.users
            .create(req.body)
            .then(data => {
            ExpressResponseDefault_1.ExpressResponseDefault.code200(req, res, next, data);
        })
            .catch(err => {
            next(new Error(err));
        });
    }
    static edit(req, res, next) {
        console.log(req.params.id);
        req.body.id = req.params.id;
        delete req.body.token;
        UserController.users
            .edit(req.params.id, req.body)
            .then(data => {
            ExpressResponseDefault_1.ExpressResponseDefault.code200(req, res, next, data);
        })
            .catch(err => {
            next(new Error(err));
        });
    }
    static delete(req, res, next) {
        UserController.users
            .delete(req.params.id)
            .then(data => {
            ExpressResponseDefault_1.ExpressResponseDefault.code200(req, res, next, data);
        })
            .catch(err => {
            next(new Error(err));
        });
    }
}
UserController.users = new users_model_1.User();
exports.UserController = UserController;
//# sourceMappingURL=users.controller.js.map
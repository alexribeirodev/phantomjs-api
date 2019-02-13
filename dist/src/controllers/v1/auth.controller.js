"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ExpressResponseDefault_1 = require("../../../utils/ExpressResponseDefault");
const JWT_1 = require("../../../utils/JWT");
class AuthController {
    constructor() { }
    static login(req, res, next) {
        const jwt = new JWT_1.default();
        ExpressResponseDefault_1.ExpressResponseDefault.code200(req, res, next, {
            token: jwt.genToken(req.body)
        });
    }
}
exports.AuthController = AuthController;
//# sourceMappingURL=auth.controller.js.map
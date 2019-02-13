"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const JWT_1 = require("../../utils/JWT");
const ExpressResponseDefault_1 = require("../../utils/ExpressResponseDefault");
class AuthMiddleware {
    constructor() { }
    static validToken(req, res, next) {
        const token = req.query.token || req.body.token || req.get("token") || req.get("TOKEN") || null;
        if (token) {
            const jwt = new JWT_1.default();
            jwt
                .decodeToken(token)
                .then(data => {
                req["tokeDecoded"] = data;
                next();
            })
                .catch(err => {
                ExpressResponseDefault_1.ExpressResponseDefault.code500(err, req, res, next);
            });
        }
        else {
            ExpressResponseDefault_1.ExpressResponseDefault.code401(req, res, next, "É necessário passar o token.");
        }
    }
}
exports.AuthMiddleware = AuthMiddleware;
//# sourceMappingURL=auth.middleware.js.map
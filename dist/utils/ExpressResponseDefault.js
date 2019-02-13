"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ExpressResponseDefault {
    constructor() { }
    static code200(req, res, next, data, message = null) {
        res.status(200).json({
            message: message || "Requisição bem sucedida.",
            data: data
        });
    }
    static code500(err, req, res, next, message = null) {
        res.status(500).json({
            message: message || "Houve um erro na requisição.",
            error: err
        });
    }
    static code401(req, res, next, message = null) {
        res.status(401).json({
            message: message || "Autenticação necessária."
        });
    }
    static code403(req, res, next, message = null) {
        res.status(403).json({
            message: message || "Acesso proibido."
        });
    }
    static code404(req, res, next, message = null) {
        res.status(404).json({
            message: message || "Não foi possível encontrar essa rota."
        });
    }
}
exports.ExpressResponseDefault = ExpressResponseDefault;
//# sourceMappingURL=ExpressResponseDefault.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
//Controllers
const users_controller_1 = require("../../controllers/v1/users.controller");
const auth_controller_1 = require("../../controllers/v1/auth.controller");
//Middlewares
const auth_middleware_1 = require("../../middleware/auth.middleware");
class RoutesV1 {
    constructor() {
        this.paths = { users: "/users", auth: "/auth" };
        this.routes = express.Router();
    }
    getRoutes() {
        this.routes.get("/", (req, res, next) => {
            res.json({
                message: "Api Project",
                version: "v1 route"
            });
        });
        // User routes
        this.routes.use(`${this.paths.users}`, auth_middleware_1.AuthMiddleware.validToken);
        this.routes.get(`${this.paths.users}`, users_controller_1.UserController.getAll);
        this.routes.get(`${this.paths.users}/:id`, users_controller_1.UserController.getById);
        this.routes.post(`${this.paths.users}`, users_controller_1.UserController.create);
        this.routes.put(`${this.paths.users}/:id`, users_controller_1.UserController.edit);
        this.routes.delete(`${this.paths.users}/:id`, users_controller_1.UserController.delete);
        //Auth routes
        this.routes.post(`${this.paths.auth}/login`, auth_controller_1.AuthController.login);
        return this.routes;
    }
}
exports.RoutesV1 = RoutesV1;
//# sourceMappingURL=index.js.map
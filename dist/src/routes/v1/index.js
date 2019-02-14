"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
//Controllers
const webprint_controller_1 = require("../../controllers/v1/webprint.controller");
class RoutesV1 {
    constructor() {
        this.paths = { webprint: "/generate" };
        this.routes = express.Router();
    }
    getRoutes() {
        this.routes.get("/", (req, res, next) => {
            res.json({
                message: "Api Project",
                version: "v1 route"
            });
        });
        //Webprint routes
        this.routes.get(`${this.paths.webprint}`, webprint_controller_1.WebprintController.generate);
        this.routes.post(`${this.paths.webprint}`, webprint_controller_1.WebprintController.generate);
        return this.routes;
    }
}
exports.RoutesV1 = RoutesV1;
//# sourceMappingURL=index.js.map
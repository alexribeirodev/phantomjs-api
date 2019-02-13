"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const logger = require("morgan");
const bodyParser = require("body-parser");
const helmet = require("helmet");
// Criando as configurações para o ExpressJS
class App {
    constructor() {
        this.express = express();
        this.middleware();
        this.routes();
    }
    // Configuração para o nosso middleware
    middleware() {
        this.express.use(logger("combined"));
        this.express.use(bodyParser.json());
        this.express.use(bodyParser.urlencoded({ extended: false }));
        this.express.use(helmet());
        this.express.use(this.methodOption);
        this.express.disable("etag");
        this.express.use(express.static("public"));
    }
    //Configuração da nossa API e nossos EndPoint e o famoso Hello
    routes() {
        let router = express.Router();
        router.get("/", (req, res, next) => {
            res.json({
                version: process.env.npm_package_version,
                message: process.env.npm_package_description
            });
        });
        this.express.use("/", router);
    }
    methodOption(req, res, next) {
        res.header("Access-Control-Allow-Origin", req.headers.origin);
        res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE, OPTIONS");
        res.header("Access-Control-Allow-Headers", "Cache-Control, Origin, Content-Type, Authorization, Content-Length, X-Requested-With");
        res.header("Access-Control-Allow-Credentials", "true");
        if (req.method == "OPTIONS") {
            res.send(200);
        }
        else {
            next();
        }
    }
}
exports.default = new App().express;
//# sourceMappingURL=server.js.map
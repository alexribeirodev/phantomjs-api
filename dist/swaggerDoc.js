"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const swaggerUi = require("swagger-ui-express");
const swaggerJsdoc = require("swagger-jsdoc");
const swaggerStats = require("swagger-stats");
const config_1 = require("./config");
const packagejson = require("./package.json");
const options = {
    swaggerDefinition: {
        openapi: "3.0.0",
        info: {
            title: packagejson.name,
            version: packagejson.version,
            description: packagejson.description
        },
        basePath: "/"
    },
    apis: ["./doc_definitions.yaml"]
};
const specs = swaggerJsdoc(options);
exports.default = (app) => {
    app.use(swaggerStats.getMiddleware({
        swaggerSpec: specs,
        authentication: config_1.default.SWG_STATS_ATHENTICATION,
        sessionMaxAge: config_1.default.SWG_STATS_SESSION_MAX_AGE,
        uriPath: config_1.default.SWG_STATS_ROUTE,
        onAuthenticate: (req, username, password) => {
            if (username === config_1.default.SWG_STATS_AUTH_USERNAME) {
                return new Promise((resolve, reject) => {
                    setTimeout(() => {
                        resolve(username === config_1.default.SWG_STATS_AUTH_USERNAME &&
                            password === config_1.default.SWG_STATS_AUTH_PASSWORD);
                    }, 1000);
                });
            }
            else {
                return false;
            }
        }
    }));
    app.use("/docs", swaggerUi.serve, swaggerUi.setup(specs));
};
//# sourceMappingURL=swaggerDoc.js.map
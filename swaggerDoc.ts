import * as swaggerUi from "swagger-ui-express";
import swaggerJsdoc = require("swagger-jsdoc");
import swaggerStats = require("swagger-stats");
import express = require("express");
import config from "./config";

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

export default (app: express.Application) => {
  app.use(
    swaggerStats.getMiddleware({
      swaggerSpec: specs,
      authentication: config.SWG_STATS_ATHENTICATION,
      sessionMaxAge: config.SWG_STATS_SESSION_MAX_AGE,
      uriPath: config.SWG_STATS_ROUTE,
      onAuthenticate: (req, username, password) => {
        if (username === config.SWG_STATS_AUTH_USERNAME) {
          return new Promise((resolve, reject) => {
            setTimeout(() => {
              resolve(
                username === config.SWG_STATS_AUTH_USERNAME &&
                  password === config.SWG_STATS_AUTH_PASSWORD
              );
            }, 1000);
          });
        } else {
          return false;
        }
      }
    })
  );
  app.use("/docs", swaggerUi.serve, swaggerUi.setup(specs));
};

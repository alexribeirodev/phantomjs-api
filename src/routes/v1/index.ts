import express = require("express");
//Controllers
import { WebprintController } from '../../controllers/v1/webprint.controller';

export class RoutesV1 {
  private routes: express.Router;
  private paths: {
    webprint?: string;
  };
  constructor() {
    this.paths = { webprint: "/generate" };
    this.routes = express.Router();
  }

  getRoutes() {
    this.routes.get(
      "/",
      (
        req: express.Request,
        res: express.Response,
        next: express.NextFunction
      ) => {
        res.json({
          message: "Api Project",
          version: "v1 route"
        });
      }
    );

    //Webprint routes
    this.routes.get(`${this.paths.webprint}`, WebprintController.generate);
    this.routes.post(`${this.paths.webprint}`, WebprintController.generate);

    return this.routes;
  }
}

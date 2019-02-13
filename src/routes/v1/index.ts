import express = require("express");
//Controllers
import { UserController } from "../../controllers/v1/users.controller";
import { AuthController } from "../../controllers/v1/auth.controller";

//Middlewares
import { AuthMiddleware } from "../../middleware/auth.middleware";

export class RoutesV1 {
  private routes: express.Router;
  private paths: {
    users?;
    auth?;
  };
  constructor() {
    this.paths = { users: "/users", auth: "/auth" };
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

    // User routes
    this.routes.use(`${this.paths.users}`, AuthMiddleware.validToken);
    this.routes.get(`${this.paths.users}`, UserController.getAll);
    this.routes.get(`${this.paths.users}/:id`, UserController.getById);
    this.routes.post(`${this.paths.users}`, UserController.create);
    this.routes.put(`${this.paths.users}/:id`, UserController.edit);
    this.routes.delete(`${this.paths.users}/:id`, UserController.delete);

    //Auth routes
    this.routes.post(`${this.paths.auth}/login`, AuthController.login);

    return this.routes;
  }
}

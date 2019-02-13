import * as path from "path";
import express = require("express");
import * as logger from "morgan";
import * as bodyParser from "body-parser";
import * as helmet from "helmet";
import CustomApplication from '../custom/interfaces/application.interface';

// Criando as configurações para o ExpressJS
class App {
  // Instancia dele
  public express: CustomApplication;

  constructor() {
    this.express = express();
    this.middleware();
    this.routes();
  }

  // Configuração para o nosso middleware
  private middleware(): void {
    this.express.use(logger("combined"));
    this.express.use(bodyParser.json());
    this.express.use(bodyParser.urlencoded({ extended: false }));
    this.express.use(helmet());
    this.express.use(this.methodOption);
    this.express.disable("etag");
    this.express.use(express.static("public"));
  }

  //Configuração da nossa API e nossos EndPoint e o famoso Hello

  private routes(): void {
    let router = express.Router();

    router.get("/", (req, res, next) => {
      res.json({
        version: process.env.npm_package_version,
        message: process.env.npm_package_description
      });
    });
    this.express.use("/", router);
  }

  private methodOption(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    res.header("Access-Control-Allow-Origin", req.headers.origin);
    res.header(
      "Access-Control-Allow-Methods",
      "GET, PUT, POST, DELETE, OPTIONS"
    );
    res.header(
      "Access-Control-Allow-Headers",
      "Cache-Control, Origin, Content-Type, Authorization, Content-Length, X-Requested-With"
    );
    res.header("Access-Control-Allow-Credentials", "true");

    if (req.method == "OPTIONS") {
      res.send(200);
    } else {
      next();
    }
  }
}

export default new App().express;

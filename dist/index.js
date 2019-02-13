"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const http = require("http");
const debug = require("debug");
const config_1 = require("./config");
const swaggerDoc_1 = require("./swaggerDoc");
const server_1 = require("./bin/server");
const index_1 = require("./src/routes/v1/index");
const ExpressResponseDefault_1 = require("./utils/ExpressResponseDefault");
debug("ts-express:server");
const port = normalizePort(config_1.default.PORT);
server_1.default.set("port", port);
const server = http.createServer(server_1.default);
server.listen(port);
server.on("error", onError);
server.on("listening", onListening);
swaggerDoc_1.default(server_1.default);
let v1 = new index_1.RoutesV1();
server_1.default.use("/v1", v1.getRoutes());
// Manipulando rotas não mapeadas com retorno 404
server_1.default.use(ExpressResponseDefault_1.ExpressResponseDefault.code404);
// Manipulando retorno de erros
server_1.default.use(logErrors);
server_1.default.use(clientErrorHandler);
server_1.default.use(errorHandler);
function normalizePort(val) {
    let port = typeof val === "string" ? parseInt(val, 10) : val;
    if (isNaN(port))
        return val;
    else if (port >= 0)
        return port;
    else
        return false;
}
function onError(error) {
    if (error.syscall !== "listen")
        throw error;
    let bind = typeof port === "string" ? "Pipe " + port : "Porta " + port;
    switch (error.code) {
        case "EACCES":
            console.error(`${bind} precisa de privilégios elevados`);
            process.exit(1);
            break;
        case "EADDRINUSE":
            console.error(`${bind} já está em uso`);
            process.exit(1);
            break;
        default:
            throw error;
    }
}
function onListening() {
    let addr = server.address();
    let bind = typeof addr === "string" ? `pipe ${addr}` : `porta ${addr.port}`;
    debug(`Escutando em ${bind}`);
}
function logErrors(err, req, res, next) {
    console.error(err);
    next(err);
}
function clientErrorHandler(err, req, res, next) {
    if (req.xhr) {
        ExpressResponseDefault_1.ExpressResponseDefault.code500(err, req, res, next);
    }
    else {
        next(err);
    }
}
function errorHandler(err, req, res, next) {
    ExpressResponseDefault_1.ExpressResponseDefault.code500(err, req, res, next);
}
exports.default = server_1.default;
//# sourceMappingURL=index.js.map
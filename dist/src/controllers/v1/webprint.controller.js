"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ExpressResponseDefault_1 = require("../../../utils/ExpressResponseDefault");
const Webshot_1 = require("../../../utils/Webshot");
class WebprintController {
    constructor() { }
    static generate(req, res, next) {
        if (!("url" in req.query || "url" in req.body)) {
            next(new Error("url é um parâmetro necessário!"));
        }
        else {
            const webshot = new Webshot_1.Webshot();
            const data = Object.assign({}, req.query, req.body);
            if (!("width" in data)) {
                data.width = 1024;
            }
            if (!("height" in data)) {
                data.height = 768;
            }
            const config = {
                url: data.url,
                height: data.height,
                width: data.width
            };
            config.options = data;
            webshot
                .generate(config)
                .then((base64) => {
                ExpressResponseDefault_1.ExpressResponseDefault.code200(req, res, next, {
                    base64
                });
            })
                .catch(err => {
                next(new Error(err));
            });
        }
    }
}
exports.WebprintController = WebprintController;
//# sourceMappingURL=webprint.controller.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// import webshot = require("node-webshot");
const webshot = require("screenshot-stream");
class Webshot {
    constructor() { }
    generate(config) {
        return new Promise((resolve, reject) => {
            const size = `${config.width}x${config.height}`;
            const url = config.url;
            const renderStream = webshot(url, size, config.options);
            const buffers = [];
            renderStream.on("data", data => {
                buffers.push(data);
            });
            renderStream.on("end", () => {
                let buffer = Buffer.concat(buffers);
                resolve(buffer.toString("base64"));
            });
            renderStream.on("error", err => {
                reject(err);
            });
        });
    }
}
exports.Webshot = Webshot;
//# sourceMappingURL=Webshot.js.map
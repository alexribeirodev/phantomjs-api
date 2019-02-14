// import webshot = require("node-webshot");
import webshot = require("screenshot-stream");
import { Stream } from "stream";
import { createWriteStream } from "fs";

export interface WebshotConfig {
  url: string;
  width: number | string;
  height: number | string;
  options?: {
    crop?: boolean;
    delay?: number;
    timeout?: number;
    selector?: string;
    css?: string;
    script?: string;
    hide?: Array<string>;
    headers?: object;
    cookies?: object;
    username?: string;
    password?: string;
    format?: string;
    scale?: number;
    userAgent?: string;
    transparent?: boolean;
  };
}

export class Webshot {
  constructor() {}
  generate(config: WebshotConfig) {
    return new Promise((resolve, reject) => {
      const size = `${config.width}x${config.height}`;
      const url = config.url;
      
      const renderStream: Stream = webshot(url, size, config.options);

      const buffers = [];

      renderStream.on("data", data => {
        buffers.push(data);
      });

      renderStream.on("end", () => {
        let buffer: Buffer = Buffer.concat(buffers);
        resolve(buffer.toString("base64"));
      });

      renderStream.on("error", err => {
        reject(err);
      });
    });
  }
}

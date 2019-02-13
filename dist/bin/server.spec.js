"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const supertest = require("supertest");
const server_1 = require("./server");
describe("App", () => {
    it("works", () => supertest(server_1.default)
        .get("/")
        .expect("Content-Type", /json/)
        .expect(200));
});
//# sourceMappingURL=server.spec.js.map
import * as supertest from "supertest";
import app from "../../../index";

describe("Test routes", () => {
  describe("POST /v1/generate", () => {
    it("works", done => {
      new Promise(resolve => {
        supertest(app)
          .post("/v1/generate")
          .send({
            url: "http://www.google.com.br"
          })
          .set("Accept", "application/json")
          .expect(200)
          .then(res => {
            if (!("data" in res.body)) resolve("Missing data key");
            if (!("base64" in res.body.data)) resolve("Missing base64 key");
          })
          .then(res => {
            resolve();
          })
          .catch(resolve);
      }).then(done);
    });
  });

  describe("GET /v1/generate", () => {
    it("works", done => {
      new Promise(resolve => {
        supertest(app)
          .get(`/v1/generate?url=http://www.google.com.br`)
          .set("Accept", "application/json")
          .expect(200)
          .then(res => {
            if (!("data" in res.body)) resolve("Missing data key");
            if (!("base64" in res.body.data)) resolve("Missing base64 key");
            resolve();
          })
          .catch(resolve);
      }).then(done);
    });
  });
});

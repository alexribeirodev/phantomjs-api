import * as supertest from "supertest";
import app from "../../../index";

let data = {
  token: "",
  users: {}
};
let token = "";
let userID;

describe("POST /v1/auth/login", () => {
  it("works", done => {
    new Promise(resolve => {
      supertest(app)
        .post("/v1/auth/login")
        .send({
          username: "teste",
          password: "teste"
        })
        .set("Accept", "application/json")
        .expect(200)
        .then(res => {
          if (!("data" in res.body)) resolve("Missing data key");
          if (!("token" in res.body.data)) resolve("Missing token key");
          data.token = res.body.data.token;
        })
        .then(res => {
          resolve();
        })
        .catch(resolve);
    }).then(done);
  });
});

describe("GET /v1/users", () => {
  it("works", done => {
    new Promise(resolve => {
      supertest(app)
        .get(`/v1/users?token=${data.token}`)
        .set("Accept", "application/json")
        .expect(200)
        .then(res => {
          if (!("data" in res.body)) resolve("Missing data key");
          if (res.body.data.length <= 0) resolve("No users");
          resolve();
        })
        .catch(resolve);
    }).then(done);
  });
});

describe("POST /v1/users", () => {
  it("works", done => {
    new Promise(resolve => {
      supertest(app)
        .post(`/v1/users`)
        .set({ Accept: "application/json", TOKEN: data.token })
        .send({
          id: 0,
          name: "Teste",
          lastName: "Teste"
        })
        .expect(200)
        .then(res => {
          resolve();
        })
        .catch(resolve);
    }).then(done);
  });
});

describe("GET /v1/users/0", () => {
  it("works", done => {
    new Promise(resolve => {
      supertest(app)
        .get(`/v1/users/0`)
        .set({ Accept: "application/json", TOKEN: data.token })
        .expect(200)
        .then(res => {
          resolve();
        })
        .catch(resolve);
    }).then(done);
  });
});

describe("PUT /v1/users/0", () => {
  it("works", done => {
    new Promise(resolve => {
      supertest(app)
        .put(`/v1/users/0`)
        .set({ Accept: "application/json", TOKEN: data.token })
        .send({
          name: "Teste edited",
          lastName: "Teste edited"
        })
        .expect(200)
        .then(res => {
          resolve();
        })
        .catch(resolve);
    }).then(done);
  });
});

describe("DELETE /v1/users/0", () => {
  it("works", done => {
    new Promise(resolve => {
      supertest(app)
        .delete(`/v1/users/0`)
        .set({ Accept: "application/json", TOKEN: data.token })
        .expect(200)
        .then(res => {
          resolve();
        })
        .catch(resolve);
    }).then(done);
  });
});

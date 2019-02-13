"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const supertest = require("supertest");
const index_1 = require("../../../index");
let data = {
    token: "",
    users: {}
};
let token = "";
let userID;
describe("POST /v1/auth/login", () => {
    it("works", done => {
        new Promise(resolve => {
            supertest(index_1.default)
                .post("/v1/auth/login")
                .send({
                username: "teste",
                password: "teste"
            })
                .set("Accept", "application/json")
                .expect(200)
                .then(res => {
                if (!("data" in res.body))
                    resolve("Missing data key");
                if (!("token" in res.body.data))
                    resolve("Missing token key");
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
            supertest(index_1.default)
                .get(`/v1/users?token=${data.token}`)
                .set("Accept", "application/json")
                .expect(200)
                .then(res => {
                if (!("data" in res.body))
                    resolve("Missing data key");
                if (res.body.data.length <= 0)
                    resolve("No users");
                resolve();
            })
                .catch(resolve);
        }).then(done);
    });
});
describe("POST /v1/users", () => {
    it("works", done => {
        new Promise(resolve => {
            supertest(index_1.default)
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
            supertest(index_1.default)
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
            supertest(index_1.default)
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
            supertest(index_1.default)
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
//# sourceMappingURL=index.spec.js.map
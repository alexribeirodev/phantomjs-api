"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const secret = process.env.AUTH_SECRET || "secret";
const saltCount = process.env.AUTH_SALT_ROUND || 8;
const expiresIn = process.env.AUTH_EXPIRE_IN || "24h";
class JWT {
    constructor() { }
    hashPassword(password) {
        return new Promise((resolve, reject) => {
            bcrypt
                .hash(password, saltCount)
                .then(hashedPassword => {
                resolve(hashedPassword);
            })
                .catch(reject);
        });
    }
    genToken(data) {
        return jwt.sign({ data }, secret, {
            expiresIn
        });
    }
    decodeToken(token) {
        return new Promise((resolve, reject) => {
            jwt.verify(token, secret, (err, decoded) => {
                if (err)
                    reject(err);
                resolve(decoded);
            });
        });
    }
    comparePassword(password, hash) {
        return bcrypt.compareSync(password, hash);
    }
}
exports.default = JWT;
//# sourceMappingURL=JWT.js.map
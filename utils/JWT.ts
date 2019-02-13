import * as jwt from "jsonwebtoken";
import * as bcrypt from "bcryptjs";
const secret = process.env.AUTH_SECRET || "secret";
const saltCount = process.env.AUTH_SALT_ROUND || 8;
const expiresIn = process.env.AUTH_EXPIRE_IN || "24h";

export default class JWT {
  constructor() {}

  hashPassword(password: string): Promise<string> {
    return new Promise((resolve, reject) => {
      bcrypt
        .hash(password, saltCount)
        .then(hashedPassword => {
          resolve(hashedPassword);
        })
        .catch(reject);
    });
  }

  genToken(data: any): string {
    return jwt.sign({ data }, secret, {
      expiresIn
    });
  }

  decodeToken(token: string): Promise<string> {
    return new Promise((resolve, reject) => {
      jwt.verify(token, secret, (err, decoded) => {
        if (err) reject(err);
        resolve(decoded);
      });
    });
  }

  comparePassword(password: string, hash: string): boolean {
    return bcrypt.compareSync(password, hash);
  }
}

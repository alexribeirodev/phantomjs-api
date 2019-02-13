"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class User {
    constructor() {
        this.userList = [
            {
                id: 1,
                name: "Alex",
                lastName: "Ribeiro"
            }
        ];
    }
    getAll() {
        return new Promise((resolve, reject) => {
            resolve(this.userList);
        });
    }
    getById(id) {
        return new Promise((resolve, reject) => {
            let user = this.userList.filter(user => {
                return user.id == id;
            });
            if (user.length > 0) {
                resolve(user);
            }
            else {
                reject("Usuário não foi encontrado.");
            }
        });
    }
    create(user) {
        return new Promise((resolve, reject) => {
            let userIndex = this.userList.push(user);
            resolve(this.userList[userIndex]);
        });
    }
    edit(id, user) {
        return new Promise((resolve, reject) => {
            let userIndex = this.userList.findIndex((user, index, array) => {
                return user.id == id;
            });
            console.log(user, userIndex);
            if (userIndex != -1) {
                this.userList[userIndex] = user;
                resolve(this.userList[userIndex]);
            }
            else {
                reject("Usuário não foi encontrado.");
            }
        });
    }
    delete(id) {
        return new Promise((resolve, reject) => {
            let userIndex = this.userList.findIndex((user, index, array) => {
                return user.id == id;
            });
            if (userIndex == -1) {
                reject("Usuário não foi encontrado.");
            }
            else {
                this.userList.splice(userIndex, 1);
                resolve();
            }
        });
    }
}
exports.User = User;
//# sourceMappingURL=users.model.js.map
export interface UserModel {
  id: number;
  name: string;
  lastName: string;
}

export class User {
  private userList: [UserModel];
  constructor() {
    this.userList = [
      {
        id: 1,
        name: "Alex",
        lastName: "Ribeiro"
      }
    ];
  }

  public getAll(): Promise<UserModel[]> {
    return new Promise((resolve, reject) => {
      resolve(this.userList);
    });
  }

  public getById(id: number): Promise<UserModel[]> {
    return new Promise((resolve, reject) => {
      let user = this.userList.filter(user => {
        return user.id == id;
      });

      if (user.length > 0) {
        resolve(user);
      } else {
        reject("Usuário não foi encontrado.");
      }
    });
  }

  public create(user: UserModel): Promise<UserModel> {
    return new Promise((resolve, reject) => {
      let userIndex = this.userList.push(user);
      resolve(this.userList[userIndex]);
    });
  }

  public edit(id: number, user: UserModel): Promise<UserModel> {
    return new Promise((resolve, reject) => {
      let userIndex = this.userList.findIndex((user, index, array) => {
        return user.id == id;
      });

      console.log(user, userIndex);
      if (userIndex != -1) {
        this.userList[userIndex] = user;
        resolve(this.userList[userIndex]);
      } else {
        reject("Usuário não foi encontrado.");
      }
    });
  }

  public delete(id: number): Promise<boolean> {
    return new Promise((resolve, reject) => {
      let userIndex = this.userList.findIndex((user, index, array) => {
        return user.id == id;
      });

      if (userIndex == -1) {
        reject("Usuário não foi encontrado.");
      } else {
        this.userList.splice(userIndex, 1);
        resolve();
      }
    });
  }
}

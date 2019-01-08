const fetch = require("node-fetch");

const USERS = [];

export default class User {
  constructor(object) {
    this.id = object.id;
    this.name = object.name;
    this.age = object.age;
  }

  save() {
    USERS.push(this);
    return this;
  }

  static clearUsers() {
    USERS.length = 0;
  }

  static search({ age, name } = {}) {
    // fetch("http://localhost:3000/users").then(res => res.json()
    // ).then(json => console.log(json));

    // console.log(Number(age));

//    return USERS.filter(user => {
//      const hoge = Number(age);
//      if (Number.isNaN(hoge) ? false : user.age === hoge) {
//        return (name ? user.name === name : true)
//       }
//       return false
//     });
    return USERS.filter(user =>
      // TODO リファクタリング NaNがたまたまうまくいくから気持ち悪い
      (Number(age) >= 0 ? user.age === age : true)
      && (name ? user.name === name : true)
    );
  }
}

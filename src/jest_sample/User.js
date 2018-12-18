// @flow
export default class User {
  constructor(object) {
    this.id = object.id;
    this.name = object.name;
    this.age = object.age;
  }

  save() {
    return this;
  }
}

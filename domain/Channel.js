import { observable } from "mobx";

export default class Channel {
  @observable name;

  constructor(name = "", id = "") {
    this.name = name;
    this.id = id;
  }

  rename(newName) {
    this.name = newName;
  }
}

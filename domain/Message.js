import { observable } from "mobx";

export default class Message {
  @observable text;
  @observable date;
  @observable username;
  @observable channelId;

  constructor(text = "", username = "", channelId = "", id = "") {
    this.text = text;
    this.date = new Date().getTime();
    this.id = id;
    this.username = username;
    this.channelId = channelId;
  }
}

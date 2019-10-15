import { observable } from "mobx";
import Message from "../domain/Message";

export default class MessageStore {
  @observable messages;
  @observable isLoading = true;

  constructor(dataSource) {
    this.dataSource = dataSource;
    this.dataSource.setMessageStore(this);
    this.messages = {};
  }

  findMessage(id) {
    return this.messages.find(message => message.id === id);
  }

  findMessages(channel) {
    return this.messages.find(message => message.channel.id === channel.id);
  }

  // Handle local action: message added by user
  addMessage(text, username, channelId) {
    const message = new Message(text, username, channelId);
    // Set new message id, defined by datasource
    message.id = this.dataSource.addMessage(message);
  }
}

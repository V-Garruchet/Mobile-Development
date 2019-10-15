import { observable } from "mobx";
import Channel from "../domain/Channel";

export default class ChannelStore {
  @observable channels;
  @observable isLoading = true;

  constructor(dataSource) {
    this.dataSource = dataSource;
    this.dataSource.setChannelStore(this);

    this.channels = [];
  }

  findChannel(id) {
    return this.channels.find(channel => channel.id === id);
  }

  // Handle local action: channel added by user
  addChannel(name) {
    const channel = new Channel(name);
    // Set new channel id, defined by datasource
    channel.id = this.dataSource.addChannel(channel);
  }
}

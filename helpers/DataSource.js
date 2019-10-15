import firebase from "firebase";
import Channel from "../domain/Channel";
import Message from "../domain/Message";
const API_KEY = "AIzaSyAaOxTEtii-JOaUFhXE2HTffqUR3YJAeZ0";

export default class DataSource {
  constructor() {
    //Will be set later in setMessageStore and setChannelStore, after stores creation
    this.messageStore = undefined;
    this.channelStore = undefined;

    // Initialize Firebase
    const firebaseConfig = {
      apiKey: API_KEY,
      authDomain: "chatbox-bb12c.firebaseapp.com",
      databaseURL: "https://chatbox-bb12c.firebaseio.com",
      projectId: "chatbox-bb12c",
      storageBucket: "chatbox-bb12c.appspot.com",
      messagingSenderId: "125793683640"
    };
    firebase.initializeApp(firebaseConfig);

    this.db = firebase.database();

    // Store reference to channel hierarchy in Firebase
    this.channelsRef = this.db.ref("channels");
    this.channelsRef.on("child_added", data => this.onChannelAdded(data));

    //Same for message
    this.messagesRef = this.db.ref("messages");
    this.messagesRef.on("child_added", channel => {
      channel.ref.on("child_added", data => this.onMessageAdded(data));
    });
  }

  //Messages

  //Add store to properties
  setMessageStore(messageStore) {
    this.messageStore = messageStore;
  }

  onMessageAdded(data) {
    const message = new Message(
      data.val().text,
      data.val().username,
      data.val().channelId,
      data.key
    );

    this.messageStore.messages[message.channelId] = [
      message,
      ...this.messageStore.messages[message.channelId]
    ];
  }

  // Handle Firebase event: message added to database
  addMessage(message) {
    const messageRef = this.messagesRef.child(message.channelId).push(message);

    return messageRef.getKey();
  }

  //Channels

  //Add store to properties
  setChannelStore(channelStore) {
    this.channelStore = channelStore;
  }
  // Handle Firebase event: channel added to database
  onChannelAdded(data) {
    const channel = new Channel(data.val().name, data.key);
    // Add new Channel at beginning of array
    this.channelStore.channels = [channel, ...this.channelStore.channels];

    // this.channelStore.channels.unshift(channel);
    this.messageStore.messages[channel.id] = [];
  }

  // Add a new channel into Firebase
  addChannel(channel) {
    // Add new child in channels hierarchy
    const channelRef = this.channelsRef.push(channel);
    return channelRef.getKey();
  }
}

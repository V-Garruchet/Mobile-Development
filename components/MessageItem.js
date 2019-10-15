import React, { Component } from "react";
import { StyleSheet, View, Text, Image } from "react-native";

export default class MessageItem extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { message, user } = this.props;
    const isFromCurrentUser = user.username == message.username;

    return (
      <View
        flexDirection="row"
        alignItems="center"
        style={isFromCurrentUser ? styles.myMessage : styles.otherMessage}
      >
        <Image
          style={
            isFromCurrentUser ? styles.avatarVisible : styles.avatarInvisible
          }
          source={{
            uri:
              "https://api.adorable.io/avatars/285/a" +
              message.username +
              "abott@aole.png"
          }}
        />
        <View
          style={[
            styles.bubble,
            isFromCurrentUser
              ? { backgroundColor: "#41A941" }
              : { backgroundColor: "#8e8e8e" }
          ]}
        >
          <View flexDirection="row" alignItems="flex-end">
            <Text style={styles.userText}>{message.username}</Text>
            <Text style={styles.dateText}>
              ({new Date(message.date).toLocaleString()})
            </Text>
          </View>
          <Text style={styles.messageText}>{message.text}</Text>
          <View style={[styles.arrowContainer, styles.arrowLeftContainer]}>
            <View style={styles.arrowLeft} />
          </View>
        </View>
        <Image
          style={
            isFromCurrentUser ? styles.avatarInvisible : styles.avatarVisible
          }
          source={{
            uri:
              "https://api.adorable.io/avatars/285/a" +
              message.username +
              "abott@aole.png"
          }}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  avatarVisible: {
    marginLeft: 5,
    marginRight: 5,
    width: 26,
    height: 26,
    borderRadius: 11,
    borderWidth: 0.5,
    borderColor: "#000000"
  },
  avatarInvisible: {},
  dateText: {
    color: "lightgray",
    fontSize: 12,
    fontStyle: "italic",
    paddingLeft: 5
  },
  messageText: {
    paddingTop: 5,
    color: "white",
    fontSize: 17,
    fontStyle: "italic"
  },
  userText: {
    color: "black",
    fontSize: 15,
    fontStyle: "italic"
  },
  myMessage: {
    marginLeft: 10
  },
  otherMessage: {
    alignSelf: "flex-end",
    marginRight: 10
  },
  bubble: {
    maxWidth: 250,
    paddingBottom: 15,
    borderRadius: 15,
    paddingHorizontal: 7,
    paddingTop: 7,
    borderWidth: 0.6,
    borderColor: "#000000",
    marginVertical: 3
  },
  arrowLeftContainer: {
    justifyContent: "center",
    alignItems: "flex-start"
  },
  arrowContainer: {
    position: "absolute",
    zIndex: -1
  },
  arrowLeft: {
    left: -20
  }
});

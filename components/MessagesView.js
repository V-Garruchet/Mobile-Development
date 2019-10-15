import React from "react";
import { StyleSheet, View, FlatList, Dimensions } from "react-native";
import { observer } from "mobx-react/native";
import MessageInput from "./MessageInput";
import MessageItem from "./MessageItem";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

@observer
export default class MessagesView extends React.Component {
  constructor(props) {
    super(props);

    this.onAddMessage = text => {
      this.props.messageStore.addMessage(
        text,
        this.props.user.username,
        this.props.channel.id
      );
    };
  }
  render() {
    return (
      <KeyboardAwareScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View style={styles.container} enabled>
          <View style={styles.chatMessagesContainer}>
            <FlatList
              inverted
              style={styles.chatMessagesContainer}
              data={this.props.messageStore.messages[this.props.channel.id]}
              keyExtractor={message => message.id}
              renderItem={({ item }) => (
                <MessageItem user={this.props.user} message={item} />
              )}
            />
          </View>
          <MessageInput
            style={styles.messageInputContainer}
            placeholder="Entrez votre message ..."
            onSubmitEditing={this.onAddMessage}
          />
        </View>
      </KeyboardAwareScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: Dimensions.get("window").width,
    flexDirection: "column",
    flex: 1,
    justifyContent: "center",
    alignItems: "stretch"
  },
  chatMessagesContainer: {
    flex: 9,
    backgroundColor: "#DFDFDF"
  },
  messageInputContainer: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    position: "absolute",
    bottom: 0
  }
});

import React, { Component } from "react";
import { View, StyleSheet, TextInput, Button } from "react-native";

export default class MessageInput extends Component {
  constructor(props) {
    super(props);
    this.state = { text: "" };

    this.onChangeText = text => {
      this.setState(text);
    };

    this.onSubmitEditing = () => {
      const { text } = this.state;

      if (!text) return;

      this.props.onSubmitEditing(text);

      this.setState({ text: "" });
    };
  }

  render() {
    const { placeholder } = this.props;
    return (
      <View style={styles.container}>
        <View style={styles.ViewInput}>
          <TextInput
            style={styles.TextInput}
            onChangeText={text => this.onChangeText({ text })}
            value={this.state.text}
            placeholder={placeholder}
            onSubmitEditing={this.onSubmitEditing}
          />
        </View>
        <View style={styles.sendButton}>
          <Button
            style={styles.sendButton}
            onPress={this.onSubmitEditing}
            title="Envoyer"
            color="white"
            fontWeight="bold"
          />
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "stretch",
    borderColor: "gray",
    borderWidth: 1
  },
  ViewInput: {
    flex: 7,
    flexDirection: "column",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "black"
  },
  sendButton: {
    flex: 3,
    flexDirection: "column",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "black",
    backgroundColor: "#298BC6"
  },
  TextInput: {
    fontSize: 17,
    paddingLeft: 15
  }
});

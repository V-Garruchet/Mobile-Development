import React, { Component } from "react";
import {
  TextInput,
  View,
  StyleSheet,
  Image,
  KeyboardAvoidingView
} from "react-native";
import User from "../domain/User";
import Button1 from "react-native-flat-button";

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = { username: "" };

    this.onChangeUsername = username => {
      this.setState(username);
    };

    this.onConnect = () => {
      const username = this.state.username;

      if (!username) return;

      user = new User(username);
      this.props.navigation.navigate("ChannelsView", {
        user: user
      });
    };
  }

  render() {
    const { username } = this.state;
    return (
      <KeyboardAvoidingView style={styles.container} behavior="padding">
        <View
          style={{
            backgroundColor: "#DFDFDF",
            flex: 1,
            justifyContent: "space-around"
          }}
        >
          <Image
            style={{
              width: 200,
              height: 200,
              borderRadius: 90,
              borderWidth: 0.5,
              borderColor: "#000000"
            }}
            source={{
              uri:
                "https://api.adorable.io/avatars/285/a" +
                username +
                "abott@aole.png"
            }}
          />
          <TextInput
            onChangeText={username => this.onChangeUsername({ username })}
            value={username}
            onSubmitEditing={this.onConnect}
            style={styles.textPseudo}
            placeholder="Pseudo"
          />
          <Button1
            type="primary"
            onPress={this.onConnect}
            containerStyle={styles.buttonContainer}
          >
            Se connecter
          </Button1>
        </View>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    flex: 1,
    backgroundColor: "#DFDFDF"
  },
  textPseudo: {
    fontSize: 24,
    borderColor: "black",
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    textAlign: "center"
  },
  buttonContainer: {
    width: 200,
    height: 50,
    marginVertical: 5,
    backgroundColor: "#41A941"
  }
});

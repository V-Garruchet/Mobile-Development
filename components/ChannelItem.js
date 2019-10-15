import React from "react";
import {
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  Text,
  Dimensions
} from "react-native";
import { observer } from "mobx-react/native";

@observer
export default class ChannelItem extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    const channelName = this.props.channel.name;
    return (
      <TouchableOpacity onPress={this.props.onChannelClick}>
        <View style={styles.row}>
          <Image
            style={styles.iconChannel}
            source={{
              uri:
                "https://identicons.github.com/" +
                this.props.channel.id.substr(18) +
                ".png"
            }}
          />
          <Text
            color="black"
            fontWeight="bold"
            style={{
              width: Dimensions.get("window").width - 100
            }}
          >
            {channelName}
          </Text>
        </View>
      </TouchableOpacity>
    );
  }
}
const styles = StyleSheet.create({
  iconChannel: {
    marginRight: 15,
    width: 40,
    height: 40,
    borderWidth: 0.5,
    borderColor: "#000000"
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    borderWidth: 1,
    backgroundColor: "#f5f5dc",
    width: Dimensions.get("window").width - 20
  }
});

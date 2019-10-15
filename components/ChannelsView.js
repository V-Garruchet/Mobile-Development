import React from "react";
import { StyleSheet, View, FlatList, Dimensions } from "react-native";
import { observer } from "mobx-react/native";
import ChannelItem from "./ChannelItem";
import { Ionicons } from "@expo/vector-icons";
import DialogInput from "react-native-dialog-input";
import SearchInput, { createFilter } from "react-native-search-filter";

const KEYS_TO_FILTERS = ["name"];

@observer
export default class ChannelsView extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isDialogVisible: false,
      searchTerm: ""
    };

    this.searchUpdated = term => {
      this.setState({ searchTerm: term });
    };

    this.onChannelClick = channel => {
      this.props.navigation.navigate("MessagesView", {
        user: this.props.user,
        channel: channel
      });
    };

    this.showDialog = isShow => {
      this.setState({ isDialogVisible: isShow });
    };

    this.addChannel = channelName => {
      this.props.channelStore.addChannel(channelName);
    };
  }

  render() {
    const filteredChannels = this.props.channelStore.channels.filter(
      createFilter(this.state.searchTerm, KEYS_TO_FILTERS)
    );
    return (
      <View style={styles.container}>
        <DialogInput
          isDialogVisible={this.state.isDialogVisible}
          title={"Ajouter un channel"}
          message={"Nom :"}
          hintInput={"ex : Mon channel"}
          cancelText={"Retour"}
          submitText={"Valider"}
          submitInput={channelName => {
            this.addChannel(channelName);
            this.showDialog(false);
          }}
          closeDialog={() => {
            this.showDialog(false);
          }}
        />
        <SearchInput
          onChangeText={term => {
            this.searchUpdated(term);
          }}
          style={styles.textInputBarreDeRecherche}
          placeholder="Rechercher un channel"
        />
        <FlatList
          style={styles.flat}
          data={filteredChannels}
          keyExtractor={channel => channel.id}
          renderItem={({ item }) => (
            <ChannelItem
              channel={item}
              onChannelClick={() => this.onChannelClick(item)}
            />
          )}
        />
        <Ionicons
          name="md-add-circle"
          title="Ajouter"
          size={60}
          style={styles.buttonplus}
          onPress={() => this.showDialog(true)}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: "#DFDFDF"
  },
  flat: {
    marginTop: 15,
    marginBottom: 5,
    marginRight: 5,
    marginLeft: 5,
    borderWidth: 2,
    borderColor: "#000000",
    width: Dimensions.get("window").width - 20,
    backgroundColor: "#FFFFFF"
  },
  textInputBarreDeRecherche: {
    fontSize: 17,
    borderColor: "black",
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    textAlign: "center",
    marginRight: 5,
    marginLeft: 5,
    height: 55,
    marginTop: 10,
    marginBottom: 5,
    padding: 15,
    width: Dimensions.get("window").width - 60
  },
  buttonplus: {
    color: "#298BC6"
  }
});

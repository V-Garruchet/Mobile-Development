import React from "react";
import {
  createDrawerNavigator,
  createAppContainer,
  createStackNavigator
} from "react-navigation";
import MessagesView from "../components/MessagesView";
import ChannelsView from "../components/ChannelsView";
import Login from "../components/Login";
import MessageStore from "../stores/MessageStore";
import ChannelStore from "../stores/ChannelStore";
import DataSource from "../helpers/DataSource";

//ALlow to create components with the possibility to pass some custom props (like stores), while keeping navigation varibles
const createComponent = (Component, customProps) => {
  return class extends Component {
    static navigationOptions = Component.navigationOptions;
    render() {
      const {
        navigation: {
          state: { params }
        }
      } = this.props;
      return <Component {...params} {...this.props} {...customProps} />;
    }
  };
};

const dataSource = new DataSource();

const storesProps = {
  messageStore: new MessageStore(dataSource),
  channelStore: new ChannelStore(dataSource)
};

//StackNavigator
const Stack = createStackNavigator({
  Login: {
    //We need to pass the stores to Login
    screen: createComponent(Login, storesProps),
    navigationOptions: {
      title: "Connexion",
      headerTitleStyle: { color: "white", fontSize: 25 },
      headerStyle: { backgroundColor: "#41A941" }
    }
  },

  MessagesView: {
    //We need to pass the stores to MessagesView
    screen: createComponent(MessagesView, storesProps),
    navigationOptions: {
      title: "Messages",
      headerTitleStyle: { color: "white", fontSize: 25 },
      headerStyle: { backgroundColor: "#41A941" }
    }
  },
  ChannelsView: {
    //We need to pass the stores to ChannelsView
    screen: createComponent(ChannelsView, storesProps),
    navigationOptions: {
      title: "Channels",
      headerTitleStyle: { color: "white", fontSize: 25 },
      headerStyle: { backgroundColor: "#41A941" }
    }
  }
});

//DrawerNavigator
const DrawerNavigator = createDrawerNavigator({
  Login: {
    screen: Stack,
    navigationOptions: {
      title: "Connexion"
    }
  },
  MessagesView: {
    screen: Stack,
    navigationOptions: { title: "Messages" }
  },
  ChannelsView: {
    screen: Stack,
    navigationOptions: { title: "Channels" }
  }
});

export default createAppContainer(DrawerNavigator);

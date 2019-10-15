import React from "react";
import Navigation from "./Navigation/Navigation";

export default class App extends React.Component {
  constructor() {
    super();
    //Ignore the "Setting a timer for a long period of time ..." warning in expo, as no proper solution was found
    console.ignoredYellowBox = ["Setting a timer"];
  }
  render() {
    return <Navigation />;
  }
}

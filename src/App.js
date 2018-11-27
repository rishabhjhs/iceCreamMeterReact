import React, { Component } from "react";
import "./App.css";
import Header from "./NavigationBar";
import DisplayEmployeeDetails from "./user/displayEmployeeDetails/displayDetails";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      isLoaded: false,
      hasError: false
    };
  }

  render() {
    return (
      <div className="App">
        <Header className="Header" />
        <DisplayEmployeeDetails {...this.props} />
      </div>
    );
  }
}

export default App;

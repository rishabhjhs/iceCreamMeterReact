import React, { Component } from "react";
import { Table, Button, Glyphicon } from "react-bootstrap";
import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      isLoaded: false,
      hasError: false
    };
  }

  fetchAllUsers() {
    fetch("http://localhost:3000/users", {
      headers: new Headers({ "content-type": "application/json" })
    })
      .then(result => result.json())
      .then(response => {
        this.setState({ isLoaded: true, users: response.body });
      });
  }

  componentDidMount() {
    this.fetchAllUsers();
  }

  getHeader() {
    return (
      <tr>
        <th className="table-header border-1">Name</th>
        <th className="table-header border-1">Email</th>
        <th className="table-header border-1">Counter</th>
        <th className="table-header border-1">Redeem</th>
      </tr>
    );
  }
  redirectToCreateUser = () => {
    this.props.history.push("/users/create", { lastPageUrl: "/users" });
  };

  redirectToUpdateCounterValue = event => {
    const {
      target: { id, value }
    } = event;

    fetch("http://localhost:3000/users/" + id + "/update_counter", {
      method: "POST",
      headers: new Headers({ "content-type": "application/json" }),
      body: JSON.stringify({
        counter: parseInt(value, 10) + 1
      })
    })
      .then(request => request.json())
      .then(() => this.fetchAllUsers());
  };

  // redirectToShowUser = () => {
  //   const{target:{id}}=event
  //   this.props.history.push("/user/show/"+id, { lastPageUrl: "/users" });
  // };

  redirectToRedeemPoints = e => {
    fetch("http://localhost:3000/users/" + e.target.id + "/redeem", {
      method: "GET",
      headers: new Headers({ "content-type": "application/json" })
    })
      .then(result => result.json())
      .then(() => this.fetchAllUsers());
  };

  renderRows() {
    let userList = this.state.users;
    let userListArray = [];

    userList.map(user => {
      userListArray.push(
        <tr key={user.id}>
          <td className="table-data">{user.name}</td>
          <td className="table-data">{user.email}</td>
          <td className="table-data">
            {user.counter}
            <Button
              id={user.id}
              value={user.counter}
              onClick={this.redirectToUpdateCounterValue}
            >
              <i className="glyphicon glyphicon-plus" />
            </Button>
          </td>
          <td className="table-data">
            <Button
              id={user.id}
              onClick={this.redirectToRedeemPoints}
              bsStyle="primary"
            >
              Redeem
            </Button>
            <Button id={user.id} onClick={this.displayUserDetails}>
              Show{" "}
            </Button>
          </td>
        </tr>
      );
    });

    return userListArray;
  }

  render() {
    let userHeader = [];
    let userList = [];
    var { isLoaded } = this.state;
    if (!isLoaded) {
      return <div>Loading ...</div>;
    } else {
      userList = this.renderRows();
      userHeader = this.getHeader();
      return (
        <div className="App">
          <center>
            <div className="margin-top-3">
              <Table bordered responsive>
                <thead>{userHeader}</thead>
                <tbody>{userList}</tbody>
              </Table>
            </div>
          </center>

          <button type="button" onClick={this.redirectToCreateUser}>
            Add User
          </button>
        </div>
      );
    }
  }
}

export default App;

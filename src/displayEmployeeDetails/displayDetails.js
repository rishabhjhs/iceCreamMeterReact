import React, { Component } from "react";
import { Table, Button, Row, Col } from "react-bootstrap";
import { MdAddCircle } from "react-icons/md";
import { getApiUrl } from "../serviceUrls";

export default class DisplayEmployeeDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      hasError: false
    };
  }
  componentDidMount() {
    this.fetchAllUsers();
  }

  fetchAllUsers() {
    fetch(getApiUrl("GetEmployees"), {
      headers: new Headers({ "content-type": "application/json" })
    })
      .then(result => result.json())
      .then(response => {
        this.setState({ isLoaded: true, users: response.body });
      });
  }
  getHeader() {
    return (
      <tr>
        <th className="table-header border-1">S.No</th>
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
      currentTarget: { id, value }
    } = event;

    fetch(getApiUrl("GetEmployees") + id + "/update_counter", {
      method: "POST",
      headers: new Headers({ "content-type": "application/json" }),
      body: JSON.stringify({
        counter: parseInt(value, 10) + 1
      })
    })
      .then(request => request.json())
      .then(() => this.fetchAllUsers());
  };

  editUserDetails = user => {
    let params = {
      name: user.name,
      email: user.email,
      counter: user.counter
    };
    this.props.history.push(
      { pathname: "/user/edit/" + user.id },

      { state: params, lastPageUrl: "/users" }
    );
  };

  redirectToRedeemPoints = e => {
    fetch(getApiUrl("GetEmployees") + e.currentTarget.id + "/redeem", {
      method: "GET",
      headers: new Headers({ "content-type": "application/json" })
    })
      .then(result => result.json())
      .then(() => this.fetchAllUsers());
  };
  renderRows() {
    let userList = this.state.users;
    let userListArray = [];

    userList.map((user, index) => {
      userListArray.push(
        <tr key={user.id}>
          <td className="table-data">{index + 1}</td>
          <td className="table-data">{user.name}</td>
          <td className="table-data">{user.email}</td>
          <td className="table-data">
            {user.counter}
            &nbsp;&nbsp;
            <Button
              id={user.id}
              value={user.counter}
              onClick={this.redirectToUpdateCounterValue}
            >
              <i className="glyphicon glyphicon-plus" />
            </Button>
          </td>
          <td className="table-data">
            <img
              src="./ice_cream.png"
              height="30px"
              id={user.id}
              onClick={this.redirectToRedeemPoints}
            />
            &nbsp;&nbsp;
            <a id={user.id} onClick={() => this.editUserDetails(user)}>
              Edit
            </a>
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
        <div className="container-fluid margin-top-fifty">
          <Row className="show-grid" offset={{ xs: 1 }} xs={2}>
            <Col xs={10} md={11}>
              <div>
                <h1>Ice-Cream Meter</h1>
              </div>
            </Col>
            <Col xs={2} md={1}>
              <button
                className="btn icon-font-size pull-right"
                onClick={this.redirectToCreateUser}
              >
                <MdAddCircle />
              </button>
            </Col>
          </Row>
          <center>
            <div className="margin-top-3">
              <Table bordered responsive>
                <thead>{userHeader}</thead>
                <tbody>{userList}</tbody>
              </Table>
            </div>
          </center>
        </div>
      );
    }
  }
}

import React, { Component } from "react";
import { getApiUrl } from "../../serviceUrls";
export default class EditUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      counter: 0
    };
  }
  fetchUserDetails() {
    const baseLocation = this.props.location.state.state;
    this.setState({
      name: baseLocation.name,
      email: baseLocation.email,
      counter: baseLocation.counter
    });
  }
  onSubmit = () => {
    let id = this.props.location.pathname.split("/")[3];
    const { name, email } = this.state;

    fetch(getApiUrl("baseUrl") + id, {
      method: "PUT",
      headers: new Headers({ "content-type": "application/json" }),
      body: JSON.stringify({
        user: {
          email,
          name
        }
      })
    })
      .then(response => response.json())
      .then(response => this.checkForError(response.body));
  };

  checkForError(response) {
    if (!(response === "Email already exist")) {
      this.props.history.push("/");
    } else {
      alert("Email already exist");
      this.fetchUserDetails();
    }
  }

  componentDidMount() {
    this.fetchUserDetails();
  }

  onChange = ({ target: { name, value } }) => {
    this.setState({ [name]: value });
  };
  //onSubmit = () => {};
  render() {
    return (
      <div className="form-style-5">
        <form>
          <fieldset>
            <legend>
              <span className="number">1</span> Edit Details
            </legend>
            <label>Name</label>
            <input
              type="text"
              name="name"
              value={this.state.name}
              onChange={this.onChange}
            />
            <label>Email</label>
            <input
              type="text"
              name="email"
              value={this.state.email}
              onChange={this.onChange}
            />
            <label>Points</label>
            <input
              type=""
              name="counter"
              value={this.state.counter}
              onChange={this.onChange}
              readOnly
            />
          </fieldset>
          <button type="button" onClick={this.onSubmit}>
            Submit
          </button>
        </form>
      </div>
    );
  }
}

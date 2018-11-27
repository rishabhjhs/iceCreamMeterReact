import React, { Component } from "react";
import { getApiUrl } from "../../serviceUrls";

export default class AddEmployee extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      name: "",
      phone: "",
      password: "",
      counter: 0
    };
  }

  // Parameters are 4th Way
  onChange = ({ target: { name, value } }) => {
    // 1st way
    // const name = event.target.name;
    // const value =  event.target.value;

    // 2nd Way
    // const { target } = event;
    // const name = target.name;
    // const value =  target.value;

    // 3rd Way
    // const { target : { name, value } }  = event;

    this.setState({ [name]: value });
  };

  getCounterDropList = () => {
    const baseValue = 0;
    return Array.from(new Array(100), (v, i) => (
      <option key={i} value={baseValue + i}>
        {baseValue + i}
      </option>
    ));
  };

  onSubmit = () => {
    const { name, password, phone, email, counter } = this.state;

    fetch(getApiUrl("baseUrl"), {
      method: "POST",
      headers: new Headers({ "content-type": "application/json" }),
      body: JSON.stringify({
        user: {
          email,
          password,
          phone,
          name,
          counter
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

  render() {
    return (
      <div className="form-style-5">
        <form>
          <fieldset>
            <legend>
              <span className="number">1</span> Employee Info
            </legend>
            <label>Email</label>
            <input
              type="text"
              name="email"
              placeholder="Email *"
              value={this.state.email}
              onChange={this.onChange}
            />
            <label>Name</label>
            <input
              type="text"
              name="name"
              placeholder="Name *"
              value={this.state.name}
              onChange={this.onChange}
            />
            <label>Phone</label>
            <input
              type="text"
              name="phone"
              placeholder="Phone *"
              value={this.state.phone}
              onChange={this.onChange}
            />
            <br />
            <label>Password</label>
            <input
              type="text"
              name="password"
              placeholder="Password *"
              value={this.state.password}
              onChange={this.onChange}
            />

            <label>Counter</label>
            <select
              name="counter"
              placeholder="Counter *"
              value={this.state.counter}
              onChange={this.onChange}
            >
              {this.getCounterDropList()}
            </select>
            <br />
          </fieldset>
          <button type="button" onClick={this.onSubmit}>
            Submit{" "}
          </button>
        </form>
      </div>
    );
  }
}

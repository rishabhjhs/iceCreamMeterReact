import React, { Component } from "react";

export default class AddUser extends Component {
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

  getDropList = () => {
    const baseValue = 0;
    return Array.from(new Array(100), (v, i) => (
      <option key={i} value={baseValue + i}>
        {baseValue + i}
      </option>
    ));
  };

  onSubmit = () => {
    const { name, password, phone, email, counter } = this.state;

    fetch("http://localhost:3000/users", {
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
      .then(request => request.json())
      .then(response => this.props.history.push("/"));
  };

  render() {
    return (
      <div>
        <label>Email</label>
        <input
          type="text"
          name="email"
          value={this.state.email}
          onChange={this.onChange}
        />
        <label>Name</label>
        <input
          type="text"
          name="name"
          value={this.state.name}
          onChange={this.onChange}
        />
        <label>Phone</label>
        <input
          type="text"
          name="phone"
          value={this.state.phone}
          onChange={this.onChange}
        />
        <label>Password</label>
        <input
          type="text"
          name="password"
          value={this.state.password}
          onChange={this.onChange}
        />
        <label>Counter</label>
        <select
          name="counter"
          value={this.state.counter}
          onChange={this.onChange}
        >
          {this.getDropList()}
        </select>

        <button type="submit" onClick={this.onSubmit}>
          {" "}
          Submit{" "}
        </button>
      </div>
    );
  }
}

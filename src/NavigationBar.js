import React, { Component } from "react";
import {
  Navbar,
  Nav
  //  NavItem, MenuItem, NavDropdown
} from "react-bootstrap";

export default class Header extends Component {
  render() {
    return (
      <Navbar fixedTop>
        <Navbar.Header>
          <Navbar.Brand className="padding-0">
            <img src="./icecream.png" />
            {/* <a href="#">Home</a> */}
          </Navbar.Brand>
        </Navbar.Header>
        <Navbar.Collapse>
          <Nav>
            {/* <NavItem eventKey={1} href="#">
              AddUser
            </NavItem> */}

            {/* <NavDropdown eventKey={3} title="Services" id="basic-nav-dropdown">
              <MenuItem eventKey={3.1}>Services 1</MenuItem>
              <MenuItem eventKey={3.2}>Services 2</MenuItem>
            </NavDropdown> */}
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

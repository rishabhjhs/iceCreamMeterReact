import App from "./App";
import React from "react";
import { Route, Switch } from "react-router-dom";
import AddUser from "./user/createUser/addUser";
import EditUser from "./user/editUser/editUser";

const Router = () => (
  <Switch>
    <PrivateRoute exact path={"/"} component={App} />
    <PrivateRoute exact path={"/users/create"} component={AddUser} />
    <PrivateRoute exact path={"/user/edit/:id"} component={EditUser} />
  </Switch>
);

const PrivateRoute = ({ component: Component }) => (
  <Route
    render={props => (
      <div>
        <div>
          <Component {...props} />
        </div>
      </div>
    )}
  />
);

export default Router;

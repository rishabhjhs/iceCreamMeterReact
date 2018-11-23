import App from "./App";
import React from "react";
import { Route, Switch } from "react-router-dom";
import AddUser from "./createUser/addUser";
import ShowUser from "./showUser/showUser";

const Router = () => (
  <Switch>
    <PrivateRoute exact path={"/"} component={App} />
    <PrivateRoute exact path={"/users/create"} component={AddUser} />
    <privateRoute exact path={"/users/show/:id"} component={ShowUser} />
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

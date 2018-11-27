import App from "./App";
import React from "react";
import { Route, Switch } from "react-router-dom";
import AddEmployee from "./user/createNewEmployee/addEmployee";
import ErrorPage from "./errorPage";
import EditUser from "./user/editUser/editUser";

const Router = () => (
  <Switch>
    <PrivateRoute exact path={"/"} component={App} />
    <PrivateRoute exact path={"/users/create"} component={AddEmployee} />
    <PrivateRoute exact path={"/user/edit/:id"} component={EditUser} />
    <PrivateRoute exact path={"/*"} component={ErrorPage} />
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

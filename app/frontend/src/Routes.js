import React from "react";
import { Switch } from "react-router-dom";
import Home from "./Containers/Home";
import Login from "./Containers/Login"
import Registration from "./Containers/Registration"
import Profile from "./Containers/Profile"
import AuthenticatedRoute from "./Components/AuthenticatedRoutes";
import UnauthenticatedRoute from "./Components/UnauthenticatedRoute";
import Details from "./Containers/Details";
import Cart from "./Containers/Cart"
import NotFound from "./Containers/NotFound"

export default class Routes extends React.Component {
  render() {
    return (
    <Switch>
      <UnauthenticatedRoute exact path="/login" component={Login}/>
      <UnauthenticatedRoute exact path="/" component={Home} />
      <UnauthenticatedRoute exact path="/register" component={Registration} />
      <UnauthenticatedRoute exact path="/details" component={Details} />
      <AuthenticatedRoute exact path="/profile" component={Profile} />
      <UnauthenticatedRoute exact path="/cart" component={Cart} />
      <UnauthenticatedRoute component={NotFound} />
    </Switch>

  );
  }
}
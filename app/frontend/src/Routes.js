import React from "react";
import { Route, Switch } from "react-router-dom";
import Home from "./Containers/Home";
import Login from "./Containers/Login"
import Registration from "./Containers/Registration"
import Profile from "./Containers/Profile"
import AuthenticatedRoute from "./Components/AuthenticatedRoutes";
// import UnauthenticatedRoute from "./Components/UnauthenticatedRoute";
import Details from "./Containers/Details";
import Cart from "./Containers/Cart"
import NotFound from "./Containers/NotFound"

export default class Routes extends React.Component {
  render() {
    return (
    <div className="Routes">
      <Switch>
        <Route exact path="/login" component={Login}/>
        <Route exact path="/" component={Home} />
        <Route exact path="/register" component={Registration} />
        <Route exact path="/details" component={Details} />
        <AuthenticatedRoute exact path="/profile" component={Profile} />
        <Route exact path="/cart" component={Cart} />
        <Route component={NotFound} />
      </Switch>
    </div>

  );
  }
}
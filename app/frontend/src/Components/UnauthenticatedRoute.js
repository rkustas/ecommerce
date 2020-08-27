import React from "react";
import { Route, Redirect } from "react-router-dom";

const UnauthenticatedRoute = ({ component:Component, ...rest}) => (
  
    <Route {...rest} render={(props) => (localStorage.getItem('usertoken') === null ? 
      <Component {...props} />
     : 
      <Redirect to="/" />
    )}
 />
  )
export default UnauthenticatedRoute;

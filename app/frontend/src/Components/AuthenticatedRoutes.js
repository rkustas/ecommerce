import React from "react";
import { Route, Redirect, useLocation } from "react-router-dom";

export default function AuthenticatedRoute({ component:Component, ...rest }) {
  const { pathname, search } = useLocation();
  return (
    <Route {...rest} render={(props) => 
      (localStorage.getItem('usertoken') !== null ? 
        <Component {...props} />
       : 
        <Redirect to={
          `/login?redirect=${pathname}${search}`
        } />
      )}
      />
  );
}
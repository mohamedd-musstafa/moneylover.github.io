import jwtDecode from "jwt-decode";
import React from "react";
import { Redirect, Route } from "react-router-dom";

const ProtectedRoute = ({ component: Component, ...rest }) => {
  const token =
    localStorage.getItem("token") &&
    localStorage.getItem("token").replace("Bearer ", "");
  if (token && jwtDecode(token).exp < Date.now() / 1000) {
    localStorage.clear();
  }
  return (
    <Route
      {...rest}
      render={(props) =>
        localStorage.getItem("token") ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "/Login",
              state: { from: props.location },
            }}
          />
        )
      }
    />
  );
};

export default ProtectedRoute;

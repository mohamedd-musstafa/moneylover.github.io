import jwtDecode from "jwt-decode";
import React from "react";
import { Redirect, Route } from "react-router-dom";

const checkAuth = () => {
  const token =
    localStorage.getItem("token") &&
    localStorage.getItem("token").replace("Bearer ", "");
  if (token) {
    if (jwtDecode(token).exp > Date.now() / 1000) {
      console.log(1);

      return true;
    }
    console.log(2);

    localStorage.clear();
    return false;
  }
  console.log(3);

  return false;
};

const ProtectedRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      checkAuth() ? (
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

export default ProtectedRoute;

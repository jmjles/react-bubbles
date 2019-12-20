import React from "react";
import { Route, Redirect } from "react-router-dom";

const PrivateRoute = ({ component: Component, storage,...rest }) => {
  return (
    <Route
      render={props => {
        return storage ? (
          <Component {...rest} storage={storage} />
        ) : (
          <Redirect to="/" />
        );
      }}
    />
  );
};
export default PrivateRoute;

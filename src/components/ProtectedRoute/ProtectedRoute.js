import React from "react";
import { Route, Redirect } from "react-router-dom";

export const ProtectedRoute = ({ children, loggedIn, ...props }) => {
  return (
    <Route {...props}>{loggedIn ? children : <Redirect to={"/"} />}</Route>
  );
};

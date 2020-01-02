import React from "react";
import { Route, Redirect } from "react-router-dom";

export const PublicRoute = ({ auth, children, isAdmin, ...rest }) => {
  return (
    <Route
      {...rest}
      render={({ location }) =>
        auth ? (
          isAdmin ? (
            <Redirect
              to={{
                pathname: "/admin",
                state: { from: location }
              }}
            />
          ) : (
            <Redirect
              to={{
                pathname: "/cowsay",
                state: { from: location }
              }}
            />
          )
        ) : (
          children
        )
      }
    />
  );
};

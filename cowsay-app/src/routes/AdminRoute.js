import React from "react";
import { Route, Redirect } from "react-router-dom";

export const AdminRoute = ({ auth, isAdmin, children, ...rest }) => {
  return (
    <Route
      {...rest}
      render={({ location }) =>
        auth && isAdmin ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/cowsay",
              state: { from: location }
            }}
          />
        )
      }
    />
  );
};

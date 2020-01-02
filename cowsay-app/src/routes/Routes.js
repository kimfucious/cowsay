import React, { useContext } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Context } from "../utils";
import { Admin, Cowsay, Login, Navbar, NotFound, Profile } from "../components";
import { AdminRoute } from "./AdminRoute";
import { PrivateRoute } from "./PrivateRoute";
import { PublicRoute } from "./PublicRoute";

const Routes = () => {
  const context = useContext(Context);
  return (
    <Router>
      <Navbar auth={context.authState} isAdmin={context.profileState.isAdmin} />
      <Switch>
        <PublicRoute
          path="/"
          exact
          auth={context.authState}
          isAdmin={context.profileState.isAdmin}
        >
          <Login />
        </PublicRoute>
        <PrivateRoute path="/cowsay" auth={context.authState}>
          <Cowsay />
        </PrivateRoute>
        <PrivateRoute path="/profile" auth={context.authState}>
          <Profile />
        </PrivateRoute>
        <AdminRoute
          auth={context.authState}
          isAdmin={context.profileState.isAdmin}
          path="/admin"
        >
          <Admin />
        </AdminRoute>
        <Route path="*">
          <NotFound />
        </Route>
      </Switch>
    </Router>
  );
};

export default Routes;

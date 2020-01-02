import React, { useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";
import { Context } from "./context";

const AuthCheck = () => {
  const history = useHistory();
  const context = useContext(Context);

  useEffect(() => {
    if (context.authObj.isAuthenticated()) {
      context.handleLoginSuccess();
      context.handleAddProfile(context.authObj.userProfile);
      history.replace("/");
    } else {
      context.handleLogout();
      context.handleRemoveProfile();
      history.replace("/");
    }
  }, [context, history]);

  return <div></div>;
};

export default AuthCheck;

import React, { useReducer } from "react";
import { AuthReducer } from "./store/reducers/auth";
import { Context } from "./utils/context";
import * as ACTIONS from "./store/actions";

import Routes from "./routes/Routes";

// import Auth from "./utils/auth";

// const auth = new Auth();

export const initialState = {
  isAuthenticated: false,
  profile: {
    email: "",
    firstName: "",
    lastName: "",
    isAdmin: false,
    token: "",
    expiresAt: ""
  }
};
const ContextState = () => {
  const [stateAuthReducer, dispatchAuthReducer] = useReducer(
    AuthReducer,
    initialState
  );

  const handleLoginSuccess = (token, isAdmin) => {
    dispatchAuthReducer(ACTIONS.login_success(token, isAdmin));
  };

  const handleLoginFail = error => {
    dispatchAuthReducer(ACTIONS.login_fail(error));
  };

  const handleSignup = () => {
    dispatchAuthReducer(ACTIONS.signup_success());
  };

  const handleLogout = () => {
    dispatchAuthReducer(ACTIONS.logout(initialState));
  };

  const handleAddProfile = profile => {
    dispatchAuthReducer(ACTIONS.add_profile(profile));
  };

  const handleUpdateProfile = profile => {
    dispatchAuthReducer(ACTIONS.update_profile(profile));
  };

  // const handleRemoveProfile = () => {
  //   dispatchAuthReducer(ACTIONS.remove_profile());
  // };

  //Handle authentication from callback
  // const handleAuth = props => {
  //   if (props.location.hash) {
  //     auth.handleAuth();
  //   }
  // };

  return (
    <div>
      <Context.Provider
        value={{
          authState: stateAuthReducer.isAuthenticated,
          profileState: stateAuthReducer.profile,
          handleLoginFail: error => handleLoginFail(error),
          handleLoginSuccess: (token, isAdmin) =>
            handleLoginSuccess(token, isAdmin),
          handleSignup: () => handleSignup(),
          handleLogout: () => handleLogout(),
          handleAddProfile: profile => handleAddProfile(profile),
          handleUpdateProfile: profile => handleUpdateProfile(profile)
          // handleRemoveProfile: () => handleRemoveProfile()

          //Handle auth
          // handleAuth: props => handleAuth(props),
          // authObj: auth
        }}
      >
        <Routes />
      </Context.Provider>
    </div>
  );
};

export default ContextState;

import React, { useContext } from "react";
import { Context } from "../utils";
import { ProfileForm } from "./ProfileForm";
import moment from "moment";

export const Profile = () => {
  const context = useContext(Context);

  const initialState = {
    emailErrors: [],
    passwordErrors: [],
    loginErrors: [],
    cowsayMessage: `Your auth token expires ${moment
      .unix(context.profileState.tokenExpiresAt)
      .fromNow()}`
  };

  const {
    _id,
    email,
    firstName,
    lastName,
    isAdmin,
    token
  } = context.profileState;

  const user = {
    _id,
    email,
    firstName,
    lastName,
    isAdmin
  };

  return (
    <div className="container d-flex flex-column align-items-center justify-content-center vh-100">
      <ProfileForm
        _id={_id}
        initialState={initialState}
        isAdmin={isAdmin}
        token={token}
        userToBeModified={user}
      />
    </div>
  );
};

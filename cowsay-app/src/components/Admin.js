import React, { useContext, useEffect, useState } from "react";
import { Collapse, Button } from "reactstrap";
import axios from "axios";
import {
  Context,
  errorCheck,
  getRandomGreeting,
  handleApiError
} from "../utils";
import { CowsayHelper } from "./CowsayHelper";
import { ProfileForm } from "./ProfileForm";

export const Admin = () => {
  const context = useContext(Context);
  const [error, setError] = useState("");
  const [users, setUsers] = useState([]);
  const [isOpen, setIsOpen] = useState("");

  const initialState = {
    emailErrors: [],
    passwordErrors: [],
    loginErrors: [],
    cowsayMessage: getRandomGreeting()
  };

  useEffect(() => {
    const graphqlEndpoint = process.env.REACT_APP_API_GRAPHQL_ENDPOINT;
    const source = axios.CancelToken.source();

    const getUsers = async () => {
      try {
        const { data } = await axios(
          {
            headers: { Authorization: `Bearer ${context.profileState.token}` },
            url: graphqlEndpoint,
            method: "post",
            timeout: 4000,
            data: {
              query: `
              query { getUsers{
                _id
                displayName
                email
                firstName
                lastName
                isAdmin
                createdAt
                updatedAt
              } }
            `
            }
          },
          {
            cancelToken: source.token
          }
        );
        const error = errorCheck(data);
        if (error) {
          throw error;
        }
        setUsers(data.data.getUsers);
      } catch (error) {
        if (axios.isCancel(error)) {
          console.log("Axios request cancelled.");
        } else {
          handleApiError(context.handleLogout, error, setError);
        }
      }
    };

    getUsers();

    return () => {
      source.cancel();
    };
  }, [context.handleLogout, context.profileState.token]);
  const renderUsers = () =>
    users.map(user => (
      <li
        key={user._id}
        className="d-flex flex-column list-group-item align-items-center"
        style={{ backgroundColor: "transparent", borderColor: "#4af626" }}
      >
        <div className="d-flex align-items-center justify-content-between w-100">
          <div>
            {user.email} {user.isAdmin ? "(admin)" : ""}
          </div>
          <Button
            className="ml-auto"
            color="link"
            onClick={() => toggleIsOpen(user._id)}
          >
            {isOpen === user._id ? "CLOSE" : "EDIT"}
          </Button>
        </div>
        <div>
          <Collapse isOpen={isOpen === user._id}>
            <ProfileForm
              _id={context.profileState._id}
              fromAdminPage={true}
              initialState={initialState}
              isAdmin={context.profileState.isAdmin}
              isOpen={isOpen}
              setUsers={setUsers}
              token={context.profileState.token}
              users={users}
              userToBeModified={user}
            />
          </Collapse>
        </div>
      </li>
    ));

  const toggleIsOpen = id => {
    if (isOpen === id) {
      setIsOpen("");
    } else {
      setIsOpen(id);
    }
  };

  return (
    <div
      className="container d-flex flex-column align-items-center"
      style={{ maxWidth: "800px" }}
    >
      {error ? (
        <div className="d-flex align-items-center vh-100">
          <CowsayHelper message={error} />
        </div>
      ) : (
        <div className="w-100" style={{ marginTop: "50px" }}>
          {/* <h1 className="display-4 mt-3 mt-sm-5 text-center">Admin</h1> */}
          <ul className="list-group flush mt-3 mt-sm-5">
            {users.length ? renderUsers() : null}
          </ul>
        </div>
      )}
    </div>
  );
};

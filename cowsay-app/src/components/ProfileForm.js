import React, { useContext, useEffect, useReducer, useState } from "react";
import { Button, Col, Form, FormGroup, Label, Input } from "reactstrap";
import {
  Context,
  errorCheck,
  getRandomGreeting,
  handleApiError
} from "../utils";
import { CowsayHelper } from "./CowsayHelper";
import { ErrorsReducer } from "../store/reducers/errors";
import * as ACTIONS from "../store/actions";
import Axios from "axios";

export const ProfileForm = ({
  _id,
  fromAdminPage,
  initialState,
  isOpen,
  setUsers,
  token,
  users,
  userToBeModified
}) => {
  const context = useContext(Context);
  const [{ emailErrors, passwordErrors, cowsayMessage }, dispatch] = useReducer(
    ErrorsReducer,
    initialState
  );

  const {
    _id: userId,
    email: userEmail,
    firstName: userFirstName,
    lastName: userLastName,
    isAdmin: userIsAdmin
  } = userToBeModified;

  const [confirmDelete, setConfirmDelete] = useState(false);
  const [cowsayHelperMessage, setCowsayHelperMessage] = useState("");
  const [formEmail, setFormEmail] = useState(userEmail);
  const [errors, setErrors] = useState([]);
  const [initialFormValues, setInitialFormValues] = useState({
    email: userEmail,
    firstName: userFirstName,
    lastName: userLastName,
    isAdmin: userIsAdmin
  });
  const [formFirstName, setFormFirstName] = useState(userFirstName || "");
  const [formIsAdmin, setFormIsAdmin] = useState(userIsAdmin);
  const [formLastName, setFormLastName] = useState(userLastName || "");

  useEffect(() => {
    if (emailErrors.length || passwordErrors.length) {
      const tempErrors = [...emailErrors, ...passwordErrors];
      const message = tempErrors.join(" ");
      setErrors(tempErrors);
      if (cowsayMessage) {
        setCowsayHelperMessage(cowsayMessage);
      } else {
        setCowsayHelperMessage(message);
      }
    } else {
      setErrors([]);
      setCowsayHelperMessage(cowsayMessage);
    }
  }, [cowsayMessage, emailErrors, passwordErrors]);

  useEffect(() => {
    if (fromAdminPage && isOpen !== userId) {
      setCowsayHelperMessage(getRandomGreeting());
    }
  }, [fromAdminPage, isOpen, userId]);

  const formIsDirty = () => {
    const { email, firstName, lastName, isAdmin } = initialFormValues;
    if (
      email !== formEmail ||
      firstName !== formFirstName ||
      lastName !== formLastName ||
      isAdmin !== formIsAdmin
    ) {
      return true;
    }
    return false;
  };

  useEffect(() => {
    if (
      !userIsAdmin &&
      !formIsAdmin &&
      cowsayHelperMessage === "Are you sure you want to do that?"
    ) {
      setCowsayHelperMessage("You actually just did that.");
    } else if (
      userIsAdmin &&
      formIsAdmin &&
      cowsayHelperMessage === "Are you sure you want to do that?"
    ) {
      setCowsayHelperMessage("They see you rollin'");
    } else if (userIsAdmin && !formIsAdmin) {
      setCowsayHelperMessage("Are you sure you want to do that?");
    }
  }, [confirmDelete, cowsayHelperMessage, formIsAdmin, userIsAdmin]);

  const handleDelete = async id => {
    try {
      const { data } = await Axios({
        url: process.env.REACT_APP_API_GRAPHQL_ENDPOINT,
        headers: {
          Authorization: `Bearer ${token}`
        },
        method: "POST",
        data: {
          query: `
          mutation 
            deleteUser($_id: ID!){
              deleteUser(_id: $_id)
          }`,
          variables: {
            _id: userId
          }
        }
      });
      const error = errorCheck(data);
      if (error) throw error;
      if (_id === userId) {
        context.handleLogout();
      }
      setCowsayHelperMessage("User deleted!");
      if (fromAdminPage) {
        setUsers(users.filter(user => user._id !== userId));
      }
    } catch (error) {
      handleApiError(context.handleLogout, error, setCowsayHelperMessage);
    }
  };
  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const { data } = await Axios({
        url: process.env.REACT_APP_API_GRAPHQL_ENDPOINT,
        headers: {
          Authorization: `Bearer ${token}`
        },
        method: "POST",
        data: {
          query: `
          mutation 
            updateUser(
              $_id: ID!, 
              $email: String!, 
              $firstName: String, 
              $isAdmin: Boolean!,
              $lastName: String 
              ){
              updateUser(
                userInput: {
                _id: $_id, 
                email: $email, 
                firstName: $firstName, 
                isAdmin: $isAdmin
                lastName: $lastName
                }
              )
          }`,
          variables: {
            _id: userId,
            isAdmin: formIsAdmin,
            email: formEmail,
            firstName: formFirstName,
            lastName: formLastName
          }
        }
      });
      const error = errorCheck(data);
      if (error) throw error;
      setCowsayHelperMessage("User Data Saved!");
      setInitialFormValues({
        email: formEmail,
        firstName: formFirstName,
        lastName: formLastName,
        isAdmin: formIsAdmin
      });
      if (_id === userId) {
        context.handleUpdateProfile({
          email: formEmail,
          firstName: formFirstName,
          lastName: formLastName,
          isAdmin: formIsAdmin
        });
      }
    } catch (error) {
      handleApiError(context.handleLogout, error, setCowsayHelperMessage);
    }
  };
  return (
    <>
      <CowsayHelper message={cowsayHelperMessage} />
      <Form
        className="d-flex flex-column align-items-center w-100"
        onSubmit={handleSubmit}
        style={{ maxWidth: "800px" }}
      >
        <div>
          <FormGroup className="d-flex align-items-end" row>
            <Col sm={5}>
              <Label className="label__cowsay-terminal" htmlFor="email">
                Email:{" "}
              </Label>
            </Col>
            <Col sm={7}>
              <Input
                onBlur={e => {
                  dispatch(
                    ACTIONS.validate_login_input(e.target.value, "email")
                  );
                }}
                onChange={e => {
                  dispatch(ACTIONS.clearEmailErrors());
                  setFormEmail(e.target.value);
                }}
                className="input__cowsay-terminal no-border pt-1"
                name="email"
                value={formEmail}
              />
            </Col>
          </FormGroup>
          <FormGroup className="d-flex align-items-end" row>
            <Col sm={5}>
              <Label className="label__cowsay-terminal" htmlFor="firstName">
                First Name:{" "}
              </Label>
            </Col>
            <Col sm={7}>
              <Input
                className="input__cowsay-terminal no-border pt-1"
                name="firstName"
                onChange={e => {
                  setFormFirstName(e.target.value);
                }}
                placeholder="<not set>"
                value={formFirstName}
              />
            </Col>
          </FormGroup>
          <FormGroup className="d-flex align-items-end" row>
            <Col sm={5}>
              <Label className="label__cowsay-terminal" htmlFor="lastName">
                Last Name:{" "}
              </Label>
            </Col>
            <Col sm={7}>
              <Input
                className="input__cowsay-terminal no-border pt-1"
                name="lastName"
                onChange={e => {
                  setFormLastName(e.target.value);
                }}
                placeholder="<not set>"
                value={formLastName}
              />
            </Col>
          </FormGroup>
          <FormGroup className="d-flex align-items-end" row>
            <Col sm={5}>
              <Label className="label__cowsay-terminal" htmlFor="isAdmin">
                Role:
              </Label>
            </Col>
            <Col sm={7}>
              <Button
                name="isAdmin"
                color="link"
                onClick={() => {
                  setFormIsAdmin(!formIsAdmin);
                }}
                style={{ paddingBottom: "8px" }}
              >
                {formIsAdmin ? "Admin" : "User"}
              </Button>
            </Col>
          </FormGroup>
        </div>
        <div className="d-flex">
          <Button
            className={confirmDelete ? "text-danger" : ""}
            color="link"
            onClick={() => {
              confirmDelete ? handleDelete(userId) : setConfirmDelete(true);
              setCowsayHelperMessage("Are you sure? There is no undo!");
            }}
            type="button"
          >
            {confirmDelete ? "CONFIRM" : "DELETE"}
          </Button>
          {confirmDelete ? (
            <Button
              className=""
              color="link"
              onClick={() => {
                setConfirmDelete(false);
                setCowsayHelperMessage("Whew, that's a relief!");
              }}
              type="button"
            >
              CANCEL
            </Button>
          ) : null}
          <Button
            color="link"
            type="submit"
            disabled={errors.length > 0 || !formIsDirty()}
          >
            SAVE
          </Button>
        </div>
      </Form>
    </>
  );
};

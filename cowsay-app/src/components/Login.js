import React, { useContext, useEffect, useReducer, useState } from "react";
import { Button, Col, Form, FormGroup, Label, Input } from "reactstrap";
import { Context, errorCheck, getTitleCase, handleApiError } from "../utils";
import { CowsayHelper } from "./CowsayHelper";
import { useDebounce } from "use-debounce";
import * as ACTIONS from "../store/actions";
import { ErrorsReducer } from "../store/reducers/errors";
import axios from "axios";

export const Login = () => {
  const context = useContext(Context);

  const initialState = {
    emailErrors: [],
    passwordErrors: [],
    loginErrors: [],
    cowsayMessage: "Login!"
  };

  const [
    { emailErrors, passwordErrors, loginErrors, cowsayMessage },
    dispatch
  ] = useReducer(ErrorsReducer, initialState);

  const [formAction, setFormAction] = useState("login");
  const [debouncedFormAction] = useDebounce(formAction, 300);
  const [cowsayHelperMessage, setCowsayHelperMessage] = useState("");
  const [email, setEmail] = useState("");
  const [debouncedEmail] = useDebounce(email, 1000);
  const [errors, setErrors] = useState([]);
  const [password, setPassword] = useState("");
  const [debouncedPassword] = useDebounce(password, 1000);
  const [loggingIn, setLoggingIn] = useState(false);
  const [debouncedLoggingIn] = useDebounce(loggingIn, 500);

  useEffect(() => {
    dispatch(ACTIONS.clearErrors());
    setCowsayHelperMessage(getTitleCase(debouncedFormAction) + "!");
  }, [debouncedFormAction]);

  useEffect(() => {
    if (
      (emailErrors && emailErrors.length) ||
      (passwordErrors && passwordErrors.length) ||
      (loginErrors && loginErrors.length)
    ) {
      const tempErrors = [...emailErrors, ...passwordErrors, ...loginErrors];
      const message = tempErrors.join(" ");
      setErrors(tempErrors);
      if (loginErrors.length) {
        setCowsayHelperMessage(loginErrors[0]);
      } else if (cowsayMessage) {
        setCowsayHelperMessage(cowsayMessage);
      } else {
        setCowsayHelperMessage(message);
      }
    } else {
      setErrors([]);
      setCowsayHelperMessage(cowsayMessage);
    }
  }, [cowsayMessage, emailErrors, loginErrors, passwordErrors]);

  useEffect(() => {
    if (debouncedEmail) {
      dispatch(ACTIONS.clearEmailErrors());
      console.log("VALIDATING EMAIL: ", debouncedEmail);
      dispatch(ACTIONS.validate_login_input(debouncedEmail, "email"));
    }
  }, [debouncedEmail]);

  useEffect(() => {
    if (debouncedPassword) {
      dispatch(ACTIONS.clearPasswordErrors());
      console.log("VALIDATING PASSWORD: ", debouncedPassword);
      dispatch(ACTIONS.validate_login_input(debouncedPassword, "password"));
    }
  }, [debouncedPassword]);

  useEffect(() => {
    const source = axios.CancelToken.source();
    const login = async () => {
      try {
        const { data } = await axios(
          {
            url: process.env.REACT_APP_API_GRAPHQL_ENDPOINT,
            method: "POST",
            data: {
              query: `
          mutation ${
            debouncedFormAction === "login" ? "loginUser" : "signupUser"
          }($email: String!, $password: String!){
            ${
              debouncedFormAction === "login" ? "loginUser" : "signupUser"
            }(email: $email, password: $password) {
              _id email exp token isAdmin, firstName, lastName
            }
          }`,
              variables: {
                email,
                password
              }
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

        const {
          _id,
          email: userEmail,
          token,
          exp,
          isAdmin,
          firstName,
          lastName
        } =
          debouncedFormAction === "login"
            ? data.data.loginUser
            : data.data.signupUser;

        // handleAddProfile must come before handleLogin
        // because public route will route to /cowsay immdiately
        // upon context.isAuthenticated = true
        context.handleAddProfile({
          _id,
          email: userEmail,
          isAdmin,
          token,
          tokenExpiresAt: exp,
          firstName,
          lastName
        });
        context.handleLoginSuccess({ token, isAdmin });
        // PublicRoute in Routes handles this push
        // history.push("/cowsay");
      } catch (error) {
        if (axios.isCancel(error)) {
          console.log("Axios request cancelled.");
        } else {
          setLoggingIn(false);
          handleApiError(context, error, setCowsayHelperMessage);
        }
      }
    };
    if (debouncedLoggingIn) {
      login();
    }
    return () => {
      source.cancel();
    };
  }, [context, debouncedFormAction, debouncedLoggingIn, email, password]);

  const handleSubmit = async e => {
    e.preventDefault();
    setLoggingIn(true);
  };

  const renderFormHelperText = () => {
    if (debouncedFormAction === "login") {
      return (
        <p className="d-flex align-items-center helper__cowsay-terminal mt-3">
          <span>No user account?</span>
          <Button
            className="helper-link__cowsay-terminal pl-2 pr-0 py-0"
            color="link"
            onClick={() => setFormAction("signup")}
          >
            Signup here
          </Button>
          .
        </p>
      );
    }
    return (
      <p className="d-flex align-items-center helper__cowsay-terminal mt-3">
        <span>Already have an account?</span>
        <Button
          className="helper-link__cowsay-terminal pl-2 pr-0 py-0"
          color="link"
          onClick={() => setFormAction("login")}
        >
          Login here
        </Button>
        .
      </p>
    );
  };
  return (
    <div className="d-flex flex-column align-items-center justify-content-center vh-100">
      <CowsayHelper message={cowsayHelperMessage} />
      <Form onSubmit={handleSubmit} noValidate>
        <FormGroup row className="d-flex align-items-end">
          <Col sm={5}>
            <Label className="label__cowsay-terminal" for="email">
              Email:
            </Label>
          </Col>
          <Col sm={7}>
            <Input
              // autoFocus
              autoComplete="username"
              type="email"
              className={`input__cowsay-terminal no-border mb-0 ${
                emailErrors && emailErrors.length ? "is-invalid" : ""
              }`}
              name="email"
              onChange={e => {
                setCowsayHelperMessage("Hmm...");
                setEmail(e.target.value);
              }}
              onBlur={e => {
                dispatch(ACTIONS.validate_login_input(e.target.value, "email"));
              }}
              placeholder="elsie@cowsay.moo"
              style={{ paddingBottom: "8px" }}
            />
          </Col>
        </FormGroup>
        <FormGroup row className="d-flex align-items-end">
          <Col sm={5}>
            <Label className="label__cowsay-terminal" for="password">
              Password:
            </Label>
          </Col>
          <Col sm={7}>
            <Input
              autoComplete="current-password"
              type="password"
              className={`input__cowsay-terminal no-border mb-0 ${
                passwordErrors && passwordErrors.length ? "is-invalid" : ""
              }`}
              name="password"
              onChange={e => {
                setCowsayHelperMessage("Interesting...");
                setPassword(e.target.value);
              }}
              onBlur={e => {
                dispatch(
                  ACTIONS.validate_login_input(e.target.value, "password")
                );
              }}
              placeholder="P@ssw0rd123"
              style={{ paddingBottom: "8px" }}
            />
          </Col>
        </FormGroup>
        <div className="text-center w-100">
          <Button
            color="link"
            type="submit"
            disabled={!email || !password || errors.length > 0}
          >
            {debouncedFormAction.toUpperCase()}
          </Button>
        </div>
      </Form>
      {renderFormHelperText()}
    </div>
  );
};

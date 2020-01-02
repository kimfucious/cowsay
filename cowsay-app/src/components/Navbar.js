import React, { useContext } from "react";
import { Button } from "reactstrap";
import { Context } from "../utils";
import { useHistory, useLocation } from "react-router-dom";

export const Navbar = ({ auth, isAdmin }) => {
  const context = useContext(Context);
  const history = useHistory();
  const location = useLocation();

  return (
    <nav
      className="container navbar navbar-expand-lg navbar-light bg-black"
      style={{ marginBottom: "-50px" }}
    >
      <Button
        color="link"
        className="mr-auto"
        type="button"
        onClick={() => history.push("/cowsay")}
        style={{
          textDecoration: `${
            location.pathname === "/cowsay" ? "underline" : ""
          }`
        }}
      >
        <span className="">COWSAY</span>
      </Button>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        {auth ? (
          <div className="d-flex align-items-center ml-auto">
            {isAdmin ? (
              <Button
                color="link"
                onClick={() => history.push("/admin")}
                style={{
                  textDecoration: `${
                    location.pathname === "/admin" ? "underline" : ""
                  }`
                }}
              >
                ADMIN
              </Button>
            ) : null}
            <Button
              color="link"
              className="ml-3"
              type="button"
              onClick={() => history.push("/profile")}
              style={{
                textDecoration: `${
                  location.pathname === "/profile" ? "underline" : ""
                }`
              }}
            >
              <span className="m2">PROFILE</span>
            </Button>
            <Button
              color="link"
              className="ml-3"
              type="button"
              onClick={() => context.handleLogout()}
            >
              <span className="m2">LOGOUT</span>
            </Button>
          </div>
        ) : null}
      </div>
    </nav>
  );
};

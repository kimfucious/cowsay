import React from "react";
import { Button } from "reactstrap";
import { useHistory } from "react-router-dom";
import { cowsay404 } from "../data/data";

export const NotFound = () => {
  const history = useHistory();
  const termColor = "#4AF626";
  const message = cowsay404;
  return (
    <div className="d-flex container flex-column align-items-center justify-content-center w-100 vh-100">
      <pre style={{ overflowY: "hidden" }}>
        <code
          style={{
            color: termColor,
            fontFamily: "'Fira Code', monospace",
            fontSize: "18px",
            lineHeight: "1.2",
            margin: "0",
            whiteSpace: "pre"
          }}
        >
          {message}
        </code>
      </pre>
      <Button
        className="m-3"
        color="link"
        type="button"
        onClick={() => history.push("/")}
        style={{ width: "250px" }}
      >
        Go Home
      </Button>
    </div>
  );
};

import React, { useEffect, useState, useContext } from "react";
import Axios from "axios";
import { Context, cleanMessage, handleApiError, errorCheck } from "../utils";

const graphqlEndpoint = process.env.REACT_APP_API_GRAPHQL_ENDPOINT;

export const CowsayHelper = ({ message }) => {
  const [cowsayHelper, setCowsayHelper] = useState("");
  const context = useContext(Context);

  useEffect(() => {
    const source = Axios.CancelToken.source();
    const getCowSayHelper = async message => {
      try {
        const { data } = await Axios(
          {
            url: graphqlEndpoint,
            method: "POST",
            data: {
              query: `
                query getCowsayHelper($message: String!){
                  getCowsayHelper(message: $message) 
                }`,
              variables: {
                message: cleanMessage(message)
              }
            }
          },
          {
            cancelToken: source.token
          }
        );
        const error = errorCheck(data);
        if (error) throw error;
        setCowsayHelper(data.data.getCowsayHelper);
      } catch (error) {
        if (Axios.isCancel(error)) {
          console.log("Axios request cancelled.");
        } else {
          handleApiError(context.handleLogout, error, setCowsayHelper);
        }
      }
    };
    if (message) {
      getCowSayHelper(message);
    }
    return () => {
      source.cancel("Cleanup!");
    };
  }, [context.handleLogout, message]);

  const renderCowsays = () => {
    const termColor = "#4AF626";
    return (
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
          {cowsayHelper}
        </code>
      </pre>
    );
  };
  return (
    <div
      className="d-flex flex-column container align-items-center mb-3 w-100"
      style={{ maxWidth: "800px" }}
    >
      {renderCowsays()}
    </div>
  );
};

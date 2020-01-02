import React, { useContext, useEffect, useState } from "react";
import { Context, errorCheck, cleanMessage, handleApiError } from "../utils";
import Axios from "axios";
import CowsayForm from "./CowsayForm";
import CowsayOutput from "./CowsayOutput";

const graphqlEndpoint = process.env.REACT_APP_API_GRAPHQL_ENDPOINT;

export const Cowsay = () => {
  const context = useContext(Context);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [cowsays, setCowSays] = useState("");
  const [cows, setCows] = useState([]);
  const [selectedCharacter, setSelectedCharacter] = useState("cow");

  useEffect(() => {
    const source = Axios.CancelToken.source();
    const getCows = async () => {
      try {
        const { data } = await Axios(
          {
            headers: { Authorization: `Bearer ${context.profileState.token}` },
            url: graphqlEndpoint,
            method: "post",
            timeout: 4000,
            data: {
              query: `
              query { getCows }
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

        setCows(data.data.getCows);
      } catch (error) {
        if (Axios.isCancel(error)) {
          console.log("Axios request cancelled.");
        } else {
          handleApiError(context.handleLogout, error, setError);
        }
      }
    };
    if (!cows.length) {
      getCows();
    }
    return () => {
      source.cancel();
    };
  }, [context.handleLogout, context.profileState.token, cows.length]);

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const { data } = await Axios({
        headers: { Authorization: `Bearer ${context.profileState.token}` },
        url: graphqlEndpoint,
        method: "POST",
        data: {
          query: `
          query getCowsay($message: String, $character: String){
            getCowsay(message: $message, character: $character) 
          }`,
          variables: {
            message: cleanMessage(message),
            character: selectedCharacter
          }
        }
      });
      const error = errorCheck(data);
      if (error) throw error;
      setCowSays(data.data.getCowsay);
    } catch (error) {
      handleApiError(context.handleLogout, error, setError);
    }
  };

  const handleRando = async character => {
    try {
      const { data } = await Axios({
        headers: { Authorization: `Bearer ${context.profileState.token}` },
        url: graphqlEndpoint,
        method: "post",
        data: {
          query: `
          query getCowsay($message: String, $character: String){
            getCowsay(message: $message, character: $character) 
          }`,
          variables: { message: cleanMessage(message), character }
        }
      });
      const error = errorCheck(data);
      if (error) throw error;
      setCowSays(data.data.getCowsay);
    } catch (error) {
      handleApiError(context.handleLogout, error, setError);
    }
  };
  return (
    <div
      className="d-flex flex-column container align-items-center my-5 w-100"
      style={{ maxWidth: "800px" }}
    >
      <CowsayOutput cowsays={cowsays} character={selectedCharacter} />
      <CowsayForm
        characters={cows}
        handleSubmit={e => handleSubmit(e, context.profileState.token)}
        handleRando={handleRando}
        message={message}
        selectedCharacter={selectedCharacter}
        setMessage={setMessage}
        setSelectedCharacter={setSelectedCharacter}
      />
      {error ? (
        <small className="mb-3 helper__signin text-danger">{error}</small>
      ) : null}
    </div>
  );
};

import { randomComments, randomGreetings } from "../data/data";

export const cleanMessage = (str, option) => {
  return str
    .replace(/"/g, '\\"')
    .replace(/'/g, "\\'")
    .replace(/>/g, "")
    .replace(/</g, "")
    .replace(/;/g, "\\;")
    .replace(/:/g, "\\:")
    .replace(/\(/g, "\\(")
    .replace(/\)/g, "\\)");
};

export const errorCheck = data => {
  if (data.errors && data.errors.length) {
    console.log("ERROR CHECK - DATA HAS ERRORS: ", data);
    return data.errors[0];
  }
  console.log("ERROR CHECK - DATA OK: ", data);
  return false;
};

export const getTitleCase = str => {
  return str.slice(0, 1).toUpperCase() + str.slice(1);
};

export const getRandomComment = () => {
  return randomComments[Math.floor(Math.random() * randomComments.length)];
};

export const getRandomGreeting = () => {
  return randomGreetings[Math.floor(Math.random() * randomGreetings.length)];
};

export const handleApiError = (handleLogout, error, setErrorState) => {
  if (error.response) {
    if (error.response.data.message === "jwt expired") {
      alert("Token expired.  Logging out!");
      console.log("Token expired.  Logging out!");
      handleLogout("Your session has expired.");
    }
  } else {
    console.log(error);
    setErrorState(error.message);
  }
};

export const newError = (code, message, errors) => {
  const e = new Error(message);
  e.statusCode = code || 500;
  if (errors) e.errorData = errors;
  return e;
};

export const setStatusCode = error => {
  if (!error.statusCode) {
    error.statusCode = 500;
    return error;
  }
  return error;
};

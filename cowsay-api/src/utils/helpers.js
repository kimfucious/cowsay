export const setStatusCode = error => {
  if (!error.statusCode) {
    error.statusCode = 500;
    return error;
  }
  return error;
};

export const newError = (code, message, errors) => {
  const e = new Error(message);
  e.statusCode = code || 500;
  if (errors) e.errorData = errors;
  return e;
};

export const titleCase = str => {
  return str.slice(0, 1).toUpperCase() + str.slice(1);
};

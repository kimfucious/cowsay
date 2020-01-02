import validator from "validator";
import { newError } from "./helpers";

export const validateAuthUserInput = (email, password) => {
  try {
    const errors = [];
    if (validator.isEmpty(email)) errors.push(422, "Missing email");
    if (validator.isEmpty(password)) errors.push(422, "Missing password");
    if (!validator.isEmail(email)) errors.push(422, "Invalid email");
    if (!validator.isLength(password, { min: 8, max: 12 }))
      errors.push(422, "Non-conforming password");
    if (errors.length) throw newError(422, "Bad username or password", errors);
  } catch (error) {
    throw new Error(error);
  }
};

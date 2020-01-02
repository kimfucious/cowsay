import * as ACTION_TYPES from "./types";
import { getTitleCase, emailSchema, passwordSchema } from "../../utils";

export const validate_login_input = (input, type) => {
  if (type === "email") {
    try {
      emailSchema.validateSync({ email: input });
      console.log("email validation is good!");
      return {
        type: ACTION_TYPES.EMAIL_VALIDATION_SUCCESS
      };
    } catch (error) {
      console.log(error);
      return {
        type: ACTION_TYPES.EMAIL_VALIDATION_FAIL,
        payload: getTitleCase(error.message + ".")
      };
    }
  } else if (type === "password") {
    try {
      passwordSchema.validateSync({ password: input });
      console.log("password validation is good!");
      return {
        type: ACTION_TYPES.PASSWORD_VALIDATION_SUCCESS
      };
    } catch (error) {
      console.log(error);
      return {
        type: ACTION_TYPES.PASSWORD_VALIDATION_FAIL,
        payload: getTitleCase(error.message + ".")
      };
    }
  }
};

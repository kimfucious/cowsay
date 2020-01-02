import { string, object } from "yup";
export const emailSchema = object().shape({
  email: string()
    .email()
    .required()
});

export const passwordSchema = object().shape({
  password: string()
    .required()
    .min(8)
    .max(12)
});

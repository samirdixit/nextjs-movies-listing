import * as Yup from "yup";

const emailRegex =
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

export const schemaLogin = Yup.object({
  email: Yup.string()
    .email("Invalid email format")
    .required("Please enter your email")
    .matches(emailRegex, "Invalid email format"),
  password: Yup.string().required("Please enter your password").min(6),
});

export const schemaAdd = Yup.object({
  title: Yup.string().required("Please enter title"),
  publishing_year: Yup.string().required("Please select year"),
});

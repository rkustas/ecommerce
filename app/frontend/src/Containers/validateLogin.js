export default function validateLogin(values) {
  let errors = {};
  if (!values.username) {
    errors.username = "Username is required";
  } else if (!/^[a-zA-Z0-9]+$/.test(values.username)) {
    errors.username = "Username is invalid";
  }
  if (!values.password) {
    errors.password = "Password is required";
  } else if (values.password.length < 6) {
    errors.password = "Password needs to be more than 6 characters";
  }
  return errors;
}

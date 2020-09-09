export default function validate(values) {
  let errors = {};
  if (!values.username) {
  } else if (!/^[a-zA-Z0-9]+$/.test(values.username)) {
    errors.username = "Username is invalid";
  }
  if (!values.password) {
    errors.password = "Password is required";
  } else if (values.password.length < 6) {
    errors.password = "Password needs to be more than 6 characters";
  }
  if (values.password !== values.confirmPassword) {
    errors.confirmPassword = "Passwords must match!";
  }
  // Email Errors
  if (!values.email) {
    errors.email = "Required Email";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
    errors.email = "Invalid email address";
  }
  if (values.termsService === false) {
    errors.termsService = "Please agree to our terms of service!";
  }
  if (!values.firstName) {
  } else if (!/^[a-zA-Z ]{2,30}$/.test(values.firstName)) {
    errors.firstName = "First Name is invalid";
  }
  if (!values.lastName) {
  } else if (!/^[a-zA-Z ]{2,30}$/.test(values.lastName)) {
    errors.lastName = "Last Name is invalid";
  }
  return errors;
}

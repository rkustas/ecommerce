import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";

const UseFormRegister = (callback, validate) => {
  let history = useHistory();
  const [values, setValues] = useState({});
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (isSubmitting) {
      const noErrors = Object.keys(errors).length === 0;
      if (noErrors) {
        callback();
        setIsSubmitting(false);
      } else {
        setIsSubmitting(false);
      }
    }
  }, [errors]);

  const handleChange = (event) => {
    event.persist();

    const { name, value, type, checked } = event.target;
    type === "checkbox"
      ? setValues((prevState) => ({ ...prevState, [name]: checked }))
      : setValues((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleBlur = () => {
    const validationErrors = validate(values);
    setErrors(validationErrors);
  };

  const handleSubmit = async (event) => {
    if (event) event.preventDefault();
    const validationErrors = validate(values);
    const errorValues = Object.values(validationErrors);

    // async function getSimilarEmail(email) {
    //   let response = await fetch(`http://localhost:5000/user/${email}`);
    //   console.log(response);
    //   return response;
    // }

    // async function isEmailValid(values) {
    //   let email = values.email;
    //   let users = await getSimilarEmail(email);
    //   if (users.length) {
    //     let existingEmail = users[0].email;
    //     if (existingEmail === email) {
    //       alert("A user with that email address already exists!");
    //       return false;
    //     }
    //   }
    //   return true;
    // }

    setErrors(validationErrors);
    setIsSubmitting(true);
    // console.log(values);

    if (Object.keys(validationErrors).length === 0) {
      await axios
        .post("http://localhost:5000/register", values)
        .then((response) => {
          console.log("Registered Successfully");
        })
        .catch(function (error) {
          console.log(error);
        })
        .then((res) => {
          history.push("/login");
        });
    } else {
      alert(errorValues);
    }
  };

  return {
    handleChange,
    handleSubmit,
    handleBlur,
    isSubmitting,
    values,
    errors,
  };
};
export default UseFormRegister;

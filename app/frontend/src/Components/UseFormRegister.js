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

  async function handleSubmit(event) {
    if (event) event.preventDefault();
    const validationErrors = validate(values);
    // console.log(validationErrors);
    setErrors(validationErrors);
    setIsSubmitting(true);
    // console.log(values);

    if (Object.keys(validationErrors).length === 0) {
      axios
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
      alert(validationErrors);
    }
  }

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

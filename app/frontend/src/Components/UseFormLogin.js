import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";

const UseFormLogin = (callback, validate) => {
  let history = useHistory();
  const [values, setValues] = useState({});
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (isLoading) {
      const noErrors = Object.keys(errors).length === 0;
      if (noErrors) {
        callback();
        setIsLoading(false);
      } else {
        setIsLoading(false);
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

  //   const validateForm = () => {
  //     return values.username.length > 0 && values.password.length > 0;
  //   };

  const handleBlur = () => {
    const validationErrors = validate(values);
    setErrors(validationErrors);
  };

  async function handleSubmit(event) {
    if (event) event.preventDefault();
    const validationErrors = validate(values);
    // console.log(validationErrors);
    setErrors(validationErrors);
    setIsLoading(true);
    // console.log(values);

    if (Object.keys(validationErrors).length === 0) {
      axios.post("http://localhost:5000/login", values).then((response) => {
        if (!response.data.error) {
          localStorage.setItem("usertoken", response.data.token);
          history.push("/profile");
        } else {
          setIsLoading(false);
          alert(response.data.error);
        }
      });
    } else {
      alert(validationErrors);
    }
  }

  return {
    handleChange,
    handleSubmit,
    handleBlur,
    isLoading,
    values,
    errors,
  };
};
export default UseFormLogin;

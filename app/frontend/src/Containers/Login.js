import React from "react";
import { FormGroup, FormControl, FormLabel, FormCheck } from "react-bootstrap";
import "./Login.css";
import LoaderButton from "../Components/LoaderButton";
import Title from "../Components/Title";
import validateLogin from "./validateLogin";
import UseFormLogin from "../Components/UseFormLogin";

export default function Login() {
  const {
    values,
    errors,
    handleChange,
    handleSubmit,
    handleBlur,
    isLoading,
  } = UseFormLogin(login, validateLogin);

  function login() {
    console.log("Submission was successful");
  }

  const errorStyle = {
    color: "red",
    fonSize: "13px",
  };

  return (
    <div className="Login">
      <div className="loginParent">
        <div className="loginChild">
          <Title name="login" />
          <form onSubmit={handleSubmit}>
            <FormGroup controlId="username" size="large">
              <FormLabel>Username</FormLabel>
              <FormControl
                autoFocus
                name="username"
                type="username"
                value={values.username || ""}
                onChange={handleChange}
                onBlur={handleBlur}
                required
              />
            </FormGroup>
            {errors.username && (
              <span style={errorStyle}>{errors.username}</span>
            )}
            <FormGroup controlId="password" size="large">
              <FormLabel>Password</FormLabel>
              <FormControl
                name="password"
                value={values.password || ""}
                onChange={handleChange}
                type="password"
                onBlur={handleBlur}
                required
              />
            </FormGroup>
            {errors.password && (
              <span style={errorStyle}>{errors.password}</span>
            )}
            <FormGroup controlId="rememberMe" size="large">
              <FormLabel>Remember Me?</FormLabel>
              <FormCheck
                name="rememberMe"
                checked={values.rememberMe || ""}
                onChange={handleChange}
                type="checkbox"
              />
            </FormGroup>
            <LoaderButton
              block
              size="large"
              type="submit"
              isLoading={isLoading}
            >
              Login
            </LoaderButton>
          </form>
        </div>
      </div>
    </div>
  );
}

import React from "react";
import {
  Button,
  FormGroup,
  FormControl,
  FormLabel,
  FormCheck,
} from "react-bootstrap";
import "./Registration.css";
import validate from "./validateRegistration";
import Title from "../Components/Title";
import UseFormRegister from "../Components/UseFormRegister";

const Registration = () => {

  const {
    values,
    errors,
    handleChange,
    handleSubmit,
    handleBlur,
    isSubmitting,
  } = UseFormRegister(register, validate);

  function register() {
    console.log("Submission was successful");
  }

  const errorStyle = {
    color: "red",
    fonSize: "13px",
  };

  return (
    <div className="Registration">
      <div className="registerParent">
        <div className="registerChild">
          <Title name="registration" />
          <form onSubmit={handleSubmit}>
            <FormGroup controlId="firstName" size="large">
              <FormLabel>First Name</FormLabel>
              <FormControl
                autoFocus
                name="firstName"
                type="firstName"
                value={values.firstName || ""}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </FormGroup>
            {errors.firstName && (
              <span style={errorStyle}>{errors.firstName}</span>
            )}
            <FormGroup controlId="lastName" size="large">
              <FormLabel>Last Name</FormLabel>
              <FormControl
                name="lastName"
                type="lastName"
                value={values.lastName || ""}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </FormGroup>
            {errors.lastName && (
              <span style={errorStyle}>{errors.lastName}</span>
            )}
            <FormGroup controlId="email" size="large">
              <FormLabel>Email</FormLabel>
              <FormControl
                name="email"
                type="email"
                value={values.email || ""}
                onChange={handleChange}
                placeholder="name@example.com"
                required
                onBlur={handleBlur}
              />
            </FormGroup>
            {errors.email && <span style={errorStyle}>{errors.email}</span>}
            <FormGroup controlId="username" size="large">
              <FormLabel>Username</FormLabel>
              <FormControl
                name="username"
                type="username"
                value={values.username || ""}
                onChange={handleChange}
                required
                onBlur={handleBlur}
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
                required
                onBlur={handleBlur}
              />
            </FormGroup>
            {errors.password && (
              <span style={errorStyle}>{errors.password}</span>
            )}
            <FormGroup controlId="confirmPassword" size="large">
              <FormLabel>Confirm Password</FormLabel>
              <FormControl
                name="confirmPassword"
                value={values.confirmPassword || ""}
                onChange={handleChange}
                type="password"
                required
                onBlur={handleBlur}
              />
            </FormGroup>
            {errors.confirmPassword && (
              <span style={errorStyle}>{errors.confirmPassword}</span>
            )}
            <FormGroup controlId="termsService" size="large">
              <FormLabel>Agree to our Terms of Service?</FormLabel>
              <FormCheck
                name="termsService"
                checked={values.termsService || ""}
                type="checkbox"
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </FormGroup>
            {errors.termsService && (
              <span style={errorStyle}>{errors.termsService}</span>
            )}
            <Button block size="large" disabled={isSubmitting} type="submit">
              Register
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Registration;

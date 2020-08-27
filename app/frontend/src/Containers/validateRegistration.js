export default function validate(values) {
    let errors = {}
    if (!values.username) {
    } else if (!/^[a-zA-Z0-9]+$/.test(values.username)) {
        errors.username = "Username is invalid"
    }
    if (!values.password) {
        errors.password = "Password is required";
    } else if (values.password.length < 10) {
        errors.password = "Password needs to be more than 10 characters";
    }
    if (values.password !== values.confirmPassword) {
        errors.confirmPassword = "Passwords must match!"
    }
    if (!values.termsService) {
        errors.termsService = "Please agree to our terms of service!"
    }
    if (!values.firstName) {
    } else if (!/^[a-zA-Z ]{2,30}$/.test(values.firstName)) {
        errors.firstName = "First Name is invalid"
    }
    if (!values.lastName) {
    } else if (!/^[a-zA-Z ]{2,30}$/.test(values.lastName)) {
        errors.lastName = "Last Name is invalid"
    }
    return errors;
}
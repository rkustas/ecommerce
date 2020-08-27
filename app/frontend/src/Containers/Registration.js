import React,{useState} from 'react';
import { Button, FormGroup, FormControl, FormLabel, FormCheck} from "react-bootstrap";
import "./Registration.css";
import axios from 'axios'
import {useHistory} from 'react-router-dom'
import validate from './validateRegistration';
import Title from '../Components/Title';


export default function Registration() {
    let history = useHistory();

    const [errors, setErrors] = useState({firstName: "", lastName: "",email: "", username:"", password: "", confirmPassword: "", termsService: false});
    const [values, setValues] = useState({firstName: "", lastName: "",email: "", username:"", password: "", confirmPassword: "", termsService: false})

    function validateForm() {
        return values.username.length > 0 && values.password.length > 0;
    }

    function handleChange(event) {
        const {name, value,type,checked} = event.target
        
        type === "checkbox" ? setValues( { ...values, [name]: checked}) : setValues({...values, [name]: value})

    }


    async function handleSubmit(event) {
        event.preventDefault();

        setErrors(validate(values))

        const newUser = {
        firstName: event.target.firstName.value,
        lastName: event.target.lastName.value,
        email: event.target.email.value,
        username: event.target.username.value,
        password: event.target.password.value,
        termsService: Boolean(event.target.termsService.checked)
        }
        console.log(newUser);

        if (!errors) {
            axios.post('http://localhost:5000/register',newUser)
            .then(response => {
                alert('Registered!')
            })
            .catch(function(error) {
                console.log(error)
            })
            .then(res => {
                history.push('/login')
            })
        } else {
            console.log("There are errors")
        }

    }


    return(
        <div className="Registration">
            <div className="registerParent">
                <div className="registerChild">
                    <Title name="registration"/>
                    <form onSubmit={handleSubmit}>
                        <FormGroup controlId="firstName" size="large">
                            <FormLabel>First Name</FormLabel>
                            <FormControl
                                autoFocus
                                name="firstName"
                                type="firstName"
                                value={values.firstName}
                                onChange={handleChange}
                            />
                        </FormGroup>
                        {errors.firstName && <span style={{color:"darkblue", fontSize: 12}} >{errors.firstName}</span>}
                        <FormGroup controlId="lastName" size="large">
                            <FormLabel>Last Name</FormLabel>
                            <FormControl
                                name="lastName"
                                type="lastName"
                                value={values.lastName}
                                onChange={handleChange}
                            />
                        </FormGroup>
                        {errors.lastName && <span style={{color:"darkblue", fontSize: 12}} >{errors.lastName}</span>}
                        <FormGroup controlId="email" size="large">
                            <FormLabel>Email</FormLabel>
                            <FormControl
                                name="email"
                                type="email"
                                value={values.email}
                                onChange={handleChange}
                                placeholder="name@example.com"
                            />
                        </FormGroup>
                        <FormGroup controlId="username" size="large">
                            <FormLabel>Username</FormLabel>
                            <FormControl
                                name="username"
                                type="username"
                                value={values.username}
                                onChange={handleChange}
                            />
                        </FormGroup>
                        {errors.username && <span style={{color:"darkblue", fontSize: 12}} >{errors.username}</span>}
                        <FormGroup controlId="password" size="large">
                            <FormLabel>Password</FormLabel>
                            <FormControl
                                name="password"
                                value={values.password}
                                onChange={handleChange}
                                type="password"
                            />
                        </FormGroup>
                        {errors.password && <span style={{color:"darkblue",fontSize: 12}}>{errors.password}</span>}
                        <FormGroup controlId="confirmPassword" size="large">
                            <FormLabel>Confirm Password</FormLabel>
                            <FormControl
                                name="confirmPassword"
                                value={values.confirmPassword}
                                onChange={handleChange}
                                type="password"
                            />
                        </FormGroup>
                        {errors.confirmPassword && <span style={{color:"darkblue",fontSize: 12}}>{errors.confirmPassword}</span>}
                        <FormGroup controlId="termsService" size="large">
                            <FormLabel>Agree to our Terms of Service?</FormLabel>
                            <FormCheck
                                name="termsService"
                                checked={values.termsService}
                                type="checkbox"
                                onChange={handleChange}
                            />
                        </FormGroup>
                        {errors.termsService && <span style={{color:"darkblue",fontSize: 12}}>{errors.termsService}</span>}
                        <Button block size="large" disabled={!validateForm()} type="submit">
                            Register
                        </Button>
                    </form>
                </div>
            </div>
        </div>

    )
}
import React,{useState} from 'react';
import { FormGroup, FormControl, FormLabel, FormCheck} from "react-bootstrap";
import "./Login.css";
import axios from 'axios'
import {useHistory} from 'react-router-dom'
import LoaderButton from "../Components/LoaderButton";
import Title from '../Components/Title';

export default function Login() {
    let history = useHistory();
    const [isLoading, setIsLoading] = useState(false)

    const [values, setValues] = useState({username: "", password: "", rememberMe: false});

    function validateForm() {
        return values.username.length > 0 && values.password.length > 0;
    }


    async function handleSubmit(event) {
        event.preventDefault();

        setIsLoading(true)


        const user = {
            username: event.target.username.value,
            password: event.target.password.value
        }


        axios.post('http://localhost:5000/login',user)
        .then(response => {
            if (!response.data.error) {
                localStorage.setItem('usertoken', response.data.token)
                history.push('/profile')
                console.log(response)
            } else {
                setIsLoading(false)
                alert(response.data.error)
            }
        })
        .catch(function(error) {
            console.log(error)
        })

    }

    function handleChange(event) {
        const {name, checked, type, value} = event.target;

        type === "checkbox" ? setValues( { ...values, [name]: checked}) : setValues({...values, [name]: value})
    }


    return(
        <div className="Login">
            <div className="loginParent">
                <div className="loginChild">
                    <Title name="login"/>
                    <form onSubmit={handleSubmit}>
                        <FormGroup controlId="username" size="large">
                            <FormLabel>Username</FormLabel>
                            <FormControl
                                autoFocus
                                name="username"
                                type="username"
                                value={values.username}
                                onChange={handleChange}
                            />
                        </FormGroup>
                        <FormGroup controlId="password" size="large">
                            <FormLabel>Password</FormLabel>
                            <FormControl
                                name="password"
                                value={values.password}
                                onChange={handleChange}
                                type="password"
                            />
                        </FormGroup>
                        <FormGroup controlId="rememberMe" size="large">
                            <FormLabel>Remember Me?</FormLabel>
                            <FormCheck
                                name="rememberMe"
                                checked={values.rememberMe}
                                onChange={handleChange}
                                type="checkbox"
                            />
                        </FormGroup>
                        <LoaderButton 
                            block 
                            size="large" 
                            disabled={!validateForm()} 
                            type="submit"
                            isLoading={isLoading}>
                            Login
                        </LoaderButton>
                    </form>
                </div>
            </div>
        </div>

    )
}
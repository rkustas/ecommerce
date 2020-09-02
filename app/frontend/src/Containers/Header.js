import React from 'react'
import { Link, withRouter } from "react-router-dom";
import { Navbar, Nav } from "react-bootstrap";
import logo from '../logo.svg'
import {ButtonContainer} from '../Components/Button';


class Home extends React.Component {
    logOut(event) {
        event.preventDefault()
        localStorage.removeItem('usertoken')
        this.props.history.push('/login')
    }
    render() {

        const loginReglink = (
            <Nav className="ml-auto">
                <Link to="/cart" className="ml-auto p-2">
                    <ButtonContainer>
                        <span className="mr-2">
                            <i className="fas fa-cart-plus" />
                        </span>
                        my cart
                    </ButtonContainer>
                </Link>
                <Link to="/register" className="ml-auto p-2">
                    <ButtonContainer>
                        sign up
                    </ButtonContainer>
                </Link>
                <Link to="/login" className="ml-auto p-2">
                    <ButtonContainer>
                        login
                    </ButtonContainer>
                </Link>
            </Nav>
        )

        const userLink = (
            <Nav className="ml-auto">
                <Link to="/cart" className="ml-auto p-2">
                    <ButtonContainer>
                        <span className="mr-2">
                            <i className="fas fa-cart-plus" />
                        </span>
                        my cart
                    </ButtonContainer>
                </Link>
                <Link to="/profile" className="ml-auto p-2">
                    <ButtonContainer>
                        my profile
                    </ButtonContainer>
                </Link>
                <Link to="/login" className="ml-auto p-2" onClick={this.logOut.bind(this)}>
                    <ButtonContainer>
                        logout
                    </ButtonContainer>
                </Link>
            </Nav>
        )

        return (
            <Navbar className="bg-dark font-smaller fixed-top">
                <Navbar.Brand>
                    <Link to="/">
                        <img src={logo} alt="store" className="navbar-brand"/>
                    </Link>
                </Navbar.Brand>
                    {localStorage.usertoken ? userLink : loginReglink}
            </Navbar>
        )
    }
}
export default withRouter(Home)

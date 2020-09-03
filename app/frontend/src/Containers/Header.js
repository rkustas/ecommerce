import React from "react";
import { Link, withRouter } from "react-router-dom";
import { Navbar } from "react-bootstrap";
import logo from "../logo.svg";
import { FaAlignRight } from "../../node_modules/react-icons/fa";
import { ButtonContainer } from "../Components/Button";

class Home extends React.Component {
  state = {
    isOpen: false,
  };
  handleToggle = () => {
    this.setState({
      isOpen: !this.state.isOpen,
    });
  };
  logOut(event) {
    event.preventDefault();
    localStorage.removeItem("usertoken");
    this.props.history.push("/login");
  }
  render() {
    const loginReglink = (
      <li>
        <Link to="/cart">
          <ButtonContainer>
            <span className="mr-2">
              <i className="fas fa-cart-plus" />
            </span>
            my cart
          </ButtonContainer>
        </Link>
        <Link to="/register">
          <ButtonContainer>sign up</ButtonContainer>
        </Link>
        <Link to="/login">
          <ButtonContainer>login</ButtonContainer>
        </Link>
      </li>
    );

    const userLink = (
      <li>
        <Link to="/cart">
          <ButtonContainer>
            <span className="mr-2">
              <i className="fas fa-cart-plus" />
            </span>
            my cart
          </ButtonContainer>
        </Link>
        <Link to="/profile">
          <ButtonContainer>my profile</ButtonContainer>
        </Link>
        <Link to="/login" onClick={this.logOut.bind(this)}>
          <ButtonContainer>logout</ButtonContainer>
        </Link>
      </li>
    );

    return (
      <Navbar className="bg-dark font-smaller fixed-top">
        <Navbar.Brand>
          <Link to="/">
            <img src={logo} alt="store" className="navbar-brand" />
          </Link>
        </Navbar.Brand>
        <button type="button" className="nav-btn" onClick={this.handleToggle}>
          <FaAlignRight className="nav-icon" />
        </button>
        <ul className={this.state.isOpen ? "nav-links show-nav" : "nav-links"}>
          {localStorage.usertoken ? userLink : loginReglink}
        </ul>
      </Navbar>
    );
  }
}
export default withRouter(Home);

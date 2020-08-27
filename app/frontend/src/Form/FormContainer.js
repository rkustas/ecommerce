import React, { Component } from 'react';
// import toDoList from './allItems'
import Login from "./Login"
import RegistrationForm from "./Registration"
// import Conditional from "./Conditional"


class Form extends Component {
  constructor() {
    super()
    this.state = {
      // todos: toDoList,
      isLoggedIn: false,
      // isLoading: false,
      // character: {},
      // isFriendly: false,
      personName: "",
      username: "",
      password: "",
      rememberMe: false,
      terms: false
    }
  }


    // componentDidMount = () => {setTimeout(() => {
    //   this.setState({
    //     isLoading: true
    //   })
    // },1500)}

  // componentDidMount = () => {
  //   this.setState({isLoading:true})

  //   fetch("https://swapi.dev/api/people/1")
  //   .then(response => response.json())
  //   .then(data => this.setState({
  //     character: data,
  //     isLoading: false
  //   }))
  // }
  
  // handleChange = (id) => {this.setState(prevState => {
  //   const updatedTodos = prevState.todos.map(todo => {
  //     if (todo.id === id) {
  //       todo.completed = !todo.completed
  //     }
  //     return todo
  //   })
  //   return {
  //     todos: updatedTodos
  //   }
  // })}

  // handleClick = () => {this.setState(prevState => {
  //   return {
  //     isLoggedIn: !prevState.isLoggedIn
  //   }
  // }
  // )}

  handleSubmit = (event) => {
    event.preventDefault();
  }



  render() {
    return (
      <Login 
        // handleChange ={this.handleChange}
        handleInput = {this.handleInput}
        // handleClick = {this.handleClick}
        {...this.state}
      />
    )
  }
}
export default Form

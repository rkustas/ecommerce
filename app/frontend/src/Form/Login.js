import React from 'react'
// import ToDoItem from './Components/TodoItem'

function Login(props) {
    // let text = props.isLoading ? "Loading ...": props.character.name
    // const listItems = props.todos.map(item => <ToDoItem key={item.id} item={item} 
    // handleChange={props.handleChange}/>)



    return (
      <div className="loginParent">
        <main className="loginChild">
          {/* {listItems} */}
          {/* {props.isLoggedIn ?
          <h1>User is Logged In</h1> :
          <Conditional/>} */}
          <h2> Sign In</h2>
          <form onSubmit={props.handleSubmit}>
            <input 
            type="text"
            value={props.username} 
            name="username" 
            placeholder="Email" 
            onChange={props.handleInput}/>
            <br />
            <input 
            type="text"
            value={props.password} 
            name="password" 
            placeholder="Password" 
            onChange={props.handleInput}/>
            <br />
            <label>
              <input 
              type="checkbox"
              name="rememberMe"
              checked={props.rememberMe}
              onChange={props.handleInput}
              /> Remember Me?
            </label>
            <br />
            <a href="#">Forgot Password?</a>
            <br />
            <a href="#">Sign Up</a>
            <br />
            <button type="submit" disabled={!ValidateForm()}>Login</button>
          </form>
        </main>
      </div>
        /* User formik for form help and an easy api */
      );


}

export default Login
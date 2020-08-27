import React from "react";
import "./App.css";
import Routes from './Routes';
import Header from './Containers/Header';
import "../node_modules/bootstrap/dist/css/bootstrap.min.css"
import Modal from './Containers/Modal'



export default class App extends React.Component {
render () {
  return (
    <div className="App container">
        <Header />
        <Routes />
        <Modal />
    </div>
  )
}
}
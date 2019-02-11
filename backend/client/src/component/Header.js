import React,{ Component } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import Login from "./Login";
import Signup from "./Signup"
import Home from './Home'
import "./Header.css";

export default class Header extends React.Component
{
  render(){
    return(
      <Router>
          <div>
            <div class="header">
              <div class="header-right">
                <Link to="/">Home</Link>
                <Link to="/Login">Login</Link>
                <Link to="/Signup">SignUp</Link>
              </div>
            </div>
            <hr/>
            <Route path="/" component={Home}/>
            <Route path="/Login" component={Login}/>
            <Route path="/Signup" component={Signup}/>
          </div>
      </Router>

    );
  }
}
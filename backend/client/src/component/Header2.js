import React,{ Component } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import Posts from "./Posts";
import PostForm from './PostForm';
import "./Header.css";

export default class Innerheader extends React.Component
{
  constructor(props){
    super(props);
    this.logOut=this.logOut.bind(this);
  }

  logOut()
  {
    localStorage.clear();
    window.location.href = '/';
  }
  render(){
    return(
      <Router>
          <div>
            <div class="header">
              <div class="header-right">
                <Link to="/Posts">Posts</Link>
                <Link to="/PostForm">CreatePost</Link>
                <a href="#" onClick={this.logOut}>LogOut</a>
              </div>
            </div>
            <hr/>
            <Route path="/Posts" component={Posts}/>
            <Route path="/PostForm" component={PostForm}/>
          </div>
      </Router>
    );
  }
}
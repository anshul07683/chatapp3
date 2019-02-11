import React,{ Component } from "react";
import {connect } from 'react-redux';
import Innerheader from './Header2'
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux'
import 'bootstrap/dist/css/bootstrap.min.css';
import store from '../store'

function login(token) {
	ReactDOM.render(<Provider store={store}><Innerheader  token={token}/></Provider>, document.getElementById('root'));
}
class Login extends Component{
  constructor(props){
    super(props);
    this.state={
      email:'',
			password:'',
			error:{},
    }
    this.onChange = this.onChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }
  onChange(e){
	  this.setState({[e.target.name]:e.target.value});
  }

	handleClick(e){
		e.preventDefault();
		const logindata={
			email:this.state.email,
			password:this.state.password
		}
		console.log("LOGIN USER DATA",logindata)
		fetch('http://localhost:3003/user/login',{
			method:'POST',
			body:JSON.stringify(logindata),
			headers:{
				'Content-Type':'application/json'
			}
		}).then((res=>res.json()))
			.then(res=>{console.log(res)
			if(res.message==="Auth successfull"){
					let token=''
					return(
						console.log("successfully ..",res),
						localStorage.setItem('token',res.token),
						token=localStorage.getItem('token'),
						localStorage.setItem('email',res.email),
						localStorage.setItem('password',res.password),
						console.log('local storege',token),
						login(token)
					)
				}else{
					return alert("email or password is wronge")
				}
			}).catch(error=>console.log("error....",error))
			}

  render(){
	  return(
	    <div>
		    <h1>Login form</h1>
		    <form onSubmit={this.onSubmit} >
		      <div>
			      <label>User name </label><br/>
			      <input type="text" name="email"   onChange={this.onChange}/>
			    </div> <br/>
		      <div>
						<label>Password </label><br/>
						<input type="text" name="password" onChange={this.onChange}/>
					</div>
					<br/>
					<button type="button" onClick={this.handleClick}>Submit</button>
					<br/>
		    </form>
	    </div>
	  );
  }
}


export default Login;
import React,{ Component } from "react";
import {connect } from 'react-redux';
import {Provider} from 'react-redux'
import ReactDOM from 'react-dom';
import store from '../store'
import Login from "./Login";


class Signup extends Component{
  constructor(props){
    super(props);
    this.state={
      emmil:'',
      password:''
    }
    this.onChange = this.onChange.bind(this);
    this.handleClick = this.handleClick.bind(this);

  }

  onChange(e){
	  this.setState({[e.target.name]:e.target.value});
  }

  handleClick(e){
    e.preventDefault();
    if(this.state.email && this.state.password != null)
    {
      const userData ={
        email:this.state.email,
        password:this.state.password
      }
      this.props.createUser(userData);
      ReactDOM.render(<Provider store={store}><Login /></Provider>, document.getElementById('root'));
    }else alert('user name or password can not be empty');
  }


  render(){
	  return(
	    <div>
		    <h1>SignUp form</h1>
		    <form >
		      <div>
			      <label>User name </label><br/>
			      <input type="text" name="email"   onChange={this.onChange}/>
			    </div> <br/>
		      <div>
						<label>Password </label><br/>
						<input type="password" name="password" onChange={this.onChange}/>
					</div>
					<br/>
					<button type="submit" onClick={this.handleClick}>Submit</button>
					<br/>
		    </form>
	    </div>
	  );
  }
}

const mapStateToProps = state=>{
  return {

  }
}
const mapDispatchToProps = dispatch =>{
  return {
    createUser:(userData)=>dispatch({type:'ADD_USER',userData})
  }
}
export default connect(mapStateToProps,mapDispatchToProps)(Signup);
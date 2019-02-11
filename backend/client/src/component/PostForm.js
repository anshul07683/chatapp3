import React,{ Component } from "react";
import {connect } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.min.css';
import InnerHeader from './Header2'
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux'
import store from '../store'
import Posts from './Posts'
import './Post.css'

class PostForm extends Component{
  constructor(props){
	  super(props);
	  this.state = {
      title:null,
			body:null,
			postImage:null
		}
		this.onChange = this.onChange.bind(this);
		this.onClick = this.onClick.bind(this);
  }

  onChange(e){
	  this.setState({[e.target.name]:e.target.value});
  }
	onChange2(e){
		let file= e.target.files[0]
		this.setState({postImage:file})
	}

  onClick(e){
		let postImage = this.state.postImage;
		let post = new FormData();
		post.append('title',this.state.title)
		post.append('body',this.state.body)
		post.append('postImage',postImage)

		this.props.createPost(post);
		ReactDOM.render(<Provider store={store} ><Posts /></Provider>, document.getElementById("root"));
		}

  render(){
	  return(
	    <div className="div1">
				<center>
					<h3>PostForm</h3><br/><hr/>
					<form >
						<div>
							<label>Title: </label>
							<input type="text" name="title"   onChange={this.onChange} value={this.state.title}/>
						</div> <br/>
						<div>
							<label>Body: </label>
							<textarea type="text" rows="3" cols="30" name="body" onChange={this.onChange} /><br/>
						</div>
						<label> Image </label><br/>
						<input type="file" name="postImage" onChange={(e)=>this.onChange2(e)} />
						<br/>
						<button type="button"  onClick= {this.onClick}>Submit</button>
						<br/>
		    	</form>
				</center>
	    </div>
	  );
  }
}

const mapStateToProps = state =>{
	return {
		items:state.items,
	}
}

const mapDispatchToProps =  dispatch =>{
	return{
		createPost:(post) =>dispatch({type:'ADD_POST',post})
	};
};

export default connect(mapStateToProps,mapDispatchToProps)(PostForm);
import React,{ Component } from "react";
import {connect} from 'react-redux';
import Update from './update';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux'
import store from '../store'
import './Post.css'

class Posts extends Component{
	constructor(){
		super();
		this.demo = this.demo.bind(this);
	}

	componentWillMount(){
		this.props.fetchPost()
	}
	componentDidUpdate(){
		this.props.fetchPost()
	}

	demo(id)
	{
		ReactDOM.render(<Provider store={store}><Update id={id}/></Provider>, document.getElementById('root'));
	}

	render(){
		const postitems = this.props.posts.map(post =>
			(<div className="div1" key={post._id}>
				<h5>Post Title:{post.title}</h5>
				<p><b>Post Body</b>:{post.body}</p><br/>
				<img src={post.postImage} alt="Smiley-face" height="100" width="100"/>
				<button type="button" class="btn btn-sm btn-dark" onClick={()=>this.props.Delete(post._id)}>delete</button><span>  </span>
				<button type="button"   class="btn btn-sm btn-dark" id="btn" onClick={this.demo.bind(this,post._id)}>UPDATE</button>
			</div>)
		);

		return(
			<div>
				<center>
					<h1>All Posts</h1>
					{postitems}
				</center>
			</div>
		);
	}
}

const mapStateToProps=state =>({
	posts:state.posts.items,
});

const mapDispatchToProps =  dispatch =>{
	return{
		fetchPost:() => dispatch({type:'POST'}),
		Delete:(_id) => dispatch({type:'DELETE',_id}),
	};
};

export default  connect(mapStateToProps,mapDispatchToProps)(Posts);
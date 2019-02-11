import React,{Component} from 'react';
import { connect } from 'react-redux';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux'
import Posts from './Posts';
import './Post.css'
import store from '../store'
import InnerHeader from './Header2'
import 'bootstrap/dist/css/bootstrap.min.css';
import './Post.css'


class Update extends React.Component{
	constructor(props){
    super(props);
    this.state={
			title:'',
			body:''
		}
		this.post=this.post.bind(this);
		this.handleEdit = this.handleEdit.bind(this);
		this.onChange = this.onChange.bind(this);

	}

	post()
	{
    ReactDOM.render(<Provider store={store} ><InnerHeader /></Provider>, document.getElementById('root'));
	}

	onChange=(e) => {
    this.setState({[e.target.name]:e.target.value});
	}

	handleEdit = (e) =>
	{
		//e.preventDefault();
		const data = {
			id:this.props.id,
			title: this.state.title,
			body :this.state.body
		}
		this.props.update(data);
		ReactDOM.render(<Provider store={store} ><InnerHeader /></Provider>, document.getElementById('root'));
	}

	render() {
    return (
				<div className="div1"><center><h4>Updata Data</h4></center><hr/>
					  <form onSubmit={this.post}>
						<div>
							<label> Title</label><br/>
        			<input type="text" name="title" onChange={this.onChange} /><br/>
						</div>
						<div>
							<label>body</label><br/>
							<textarea  rows="5" name="body" onChange={this.onChange}
								cols="28" placeholder="Enter Post" /><br /><br />
						</div>
						<button type="button" class="btn btn-primary"  onClick={this.handleEdit}>Update</button>&emsp;&emsp;
						<button  type="button" class="btn btn-primary" onClick={this.post}>Posts</button>
					</form>

				</div>
    	);
	}
}

const mapStateToProps = state =>{
	return{
    items:state.items,
	}
}

const mapDispatchToProps = dispatch =>{
	return{
    update:(data)=>dispatch({type:'UPDATE',data})
	};
};

export default connect(mapStateToProps,mapDispatchToProps)(Update);


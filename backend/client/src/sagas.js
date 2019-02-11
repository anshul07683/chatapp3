import { takeLatest,takeEvery,put,all} from 'redux-saga/effects';

function* addPost(action)
{
	const post=action.post
	const token=localStorage.getItem('token')
	console.log("token in addpost",token)
	try{
		var url="http://localhost:3003/posts/"
		yield fetch(url,{
			method:'POST',
			body:post,
			headers: {
				'Authorization':'Bearer '+token
			},
		})
		.then(res=>res.json())
		.then(response => console.log("POST Done",response))
	}

	catch(err)
	{
		alert('error'+err)
	}
	yield put({type:'ADD_NEW_POST_ASYNC',value:post})
	//window.location.reload('root')
}

function* Post()
{
	console.log("POST is Calling..")
	try{
		const data =  yield fetch("http://localhost:3003/posts",{
			method:'GET',
			headers: {'Content-Type':'application/json'},
		}
	).then(res=>res.json());
		yield put({type:'POST_ASYNC',value:data})
	}

	catch(err){
		console.log(err);
	}
}

function* deletePost(action)
{
	const token=localStorage.getItem('token')
	console.log("token in DELETE",token)
	console.log('delete is calling from saga..',action._id);

	fetch('http://localhost:3003/posts/'+action._id,{
		method: 'delete',
		headers: {'Content-Type':'application/json',
		'Authorization':'Bearer '+token
	},
	})
	.then(res=>res.json())
	.then(response => console.log("Delete Done",response))

	yield put({type:'DELETE_POST',value:action._id})


}

function* update(action){
	const token=localStorage.getItem('token')
	console.log("token in addpost",token)
	console.log('update is from generator function');
	const data = JSON.stringify(action.data)

	try{
			yield fetch('http://localhost:3003/posts/'+action.data.id,{
			method: 'PATCH',
			body:data,
			headers: {'Content-Type':'application/json',
				'Authorization':'Bearer '+token},
		})
		.then(res=>res.json())
		.then(response => console.log("UPDATE Done",response))
	}
	catch(err){
		alert('error-------'+err)
	}
	yield put({type:'UPDATA_ASYNC'})
	//window.location.reload("root")
}

function* add_user(action){
	const user=JSON.stringify(action.userData)
	console.log(user)
	try{
		yield fetch('http://localhost:3003/user/signup',{
			method:'POST',
			body:user,
			headers: {'Content-Type':'application/json'}
		})
		.then(res=>res.json())
		.then(response => console.log("user createddsfdsfff",response))
	}

	catch(err)
	{
		alert('error'+err)
	}
	yield put({type:'ADD_NEW_USER',value:user})
}

export default function* rootSaga(){
	console.log("root saga")
	yield all([
		yield takeLatest('POST',Post),
		yield takeLatest('ADD_POST',addPost),
		yield takeEvery('DELETE',deletePost),
		yield takeEvery('UPDATE',update),
		yield takeEvery('ADD_USER',add_user),

	])
}
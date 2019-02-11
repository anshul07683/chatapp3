const initialState = {
	items:[],
};

const reducer =(state=initialState,action)=>{
	switch(action.type){
		case 'POST_ASYNC':
			console.log('reducer');
			return {
				...state,
				items:action.value
			};

		case 'ADD_NEW_POST_ASYNC':
			return {
				...state,
				items:[...state.items,action.value]

			};

		case 'DELETE_POST':
			return{
				...state,
				items:[...state.items.filter(item=>item._id!==action.value)]

			}

		case 'UPDATA_ASYNC':
			return{
				...state,
				items:[...state.items]
			}

		default :
			return state;
	}

}
export  default reducer;
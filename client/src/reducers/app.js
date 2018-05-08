// Reducer
// Reducers only update the State
import * as actionType from '../actionTypes/actionTypes';
import {REHYDRATE} from 'redux-persist/src/constants'
import uuidv4 from 'uuid/v4'

const app = (state = {
	chatDialogIsOpen: false,
	chatItem:{},
	messages:[],
	message:'',
	pageYOffset: 0,

}, action) => {
		switch (action.type) {
			case actionType.SET_APP_STATE:
				return {
					...state,
					...action.data,
				}
			case actionType.CLEAR_APP_STATE:
				return {
					senderID:'',
					chatDialogIsOpen: false,					
					chatItem:{},
					messages:[],
					message:'',
					pageYOffset: 0,
				}
			case REHYDRATE:
				if(action.payload){
					return {
						...state,
						...action.payload.app,
						chatItem:{},
						messages:[],
						message:'',
						chatDialogIsOpen: false,					
						// pageYOffset: 0,
					}
				}
				return {
					...state,
					chatItem:{},
					messages:[],
					message:'',
					chatDialogIsOpen: false,					
					// pageYOffset: 0,
				}
			default:
				return state;
		}
}
export default app;

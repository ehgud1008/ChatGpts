import {SAVE_MESSAGE} from '../_actions/types.js';

export default function (state = {messages: []}, action){
    // console.log(state.messages.concat(action.payload));
    switch (action.type){
        case SAVE_MESSAGE : 
            return {
                ...state,
                messages: state.messages.concat(action.payload)
            }
        default:
            return state;
    }
}
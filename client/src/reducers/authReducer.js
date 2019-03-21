import { FETCH_USER } from '../actions/types';

export default function(state = null, action){
  switch (action.type) {
    case FETCH_USER:
      return action.payload || false; //if user not login action.payload is empty string (treat as false in js),thus this statement will be false
    default:
      return state; //state here is null, when web app doesn't know login or not
  }
}

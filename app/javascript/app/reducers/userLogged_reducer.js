import { FETCH_USER_LOGGED, POST_LIKED } from '../actions';

export default function userLoggedReducer(state = null, action) {
  switch (action.type) {
    case FETCH_USER_LOGGED: {
      return action.payload;
    }
    // NEED TO FIND A WAY TO UPDATE REDUX STATE WHEN POST_LIKED ACTION IS FIRED (set User logged.likes.post_id.isliked)

    // case POST_LIKED: {
    //     if (state.is_liked) { 
    //         console.log(state)
    //         return {...state, is_liked: false} 
    //     } else {
    //         console.log(state)
    //         { return {...state, is_liked: true} }}
    //   }
    default:
      return state;
  }
}
import { FETCH_USER_LOGGED, POST_LIKED, USER_FOLLOWED } from '../actions';

export default function userLoggedReducer(state = null, action) {
  switch (action.type) {
    case FETCH_USER_LOGGED: {
      return action.payload;
    }
    case POST_LIKED: {
      //update user_logged
      let updated_user = action.payload.data.user
        return {...state, ...updated_user};
      }
    case USER_FOLLOWED: {
      let user_logged = action.payload.data.user_logged
      return {...state, ...user_logged}
    }  
    default:
      return state;
  }
}
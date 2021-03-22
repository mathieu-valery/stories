import { FETCH_USER_LOGGED, POST_LIKED } from '../actions';

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
    default:
      return state;
  }
}
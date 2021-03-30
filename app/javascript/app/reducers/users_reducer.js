import { FETCH_USERS, POST_COMMENT, USER_FOLLOWED } from '../actions';

export default function usersReducer(state = null, action) {
  switch (action.type) {
    case FETCH_USERS: {
      return action.payload.data;
    }

      case POST_COMMENT: {
        //if a new comment is created
        let new_comment = action.payload
        return state.map(user => {
            if (user.id === action.payload.user.id) {
                user.comments.push(new_comment)
              return user
            } else {
              return user
            }
        }) 
      }
      case USER_FOLLOWED: {
        if (action.payload.data.users) {
        return action.payload.data.users }
      }   
    default:
        return state;
    }
}

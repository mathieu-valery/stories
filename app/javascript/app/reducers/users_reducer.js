import { FETCH_USERS, POST_LIKED, POST_COMMENT, USER_FOLLOWED } from '../actions';

export default function usersReducer(state = null, action) {
  switch (action.type) {
    case FETCH_USERS: {
      return action.payload.data;
    }
    case POST_LIKED: {
      //update users
      let updated_user = action.payload.data.user
      return state.map(user => {
          if (user.id == updated_user.id) {
              return {...user, ...updated_user}
          }
          else {
              return user
          }
        })
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
        let users = action.payload.data.users
        return [...state, users]
      }  
    default:
        return state;
    }
}

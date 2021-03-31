import { FETCH_LIKES, SET_LIKE} from '../actions';

export default function likesReducer(state = null, action) {
  switch (action.type) {
    case FETCH_LIKES: {
      return action.payload;
    }
    case SET_LIKE: {
      //if a new like is created
      let new_like = action.payload
      if (!state.some((like => like.id === new_like.id))) {
        return [...state, new_like]
      }
      //if like is updated
      return state.map(like => {
        if (like.id === action.payload.id) {
          return {...like, ...action.payload}
        } else {
          return like
        }
      })
    }
    default:
      return state;
  }
}
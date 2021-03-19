import { FETCH_LIKES, POST_LIKED} from '../actions';

export default function likesReducer(state = null, action) {
  switch (action.type) {
    case FETCH_LIKES: {
      return action.payload;
    }
    case POST_LIKED: {
      console.log('IN REDUCER NEW LIKES ARE:')
      console.log(action.payload.data.like)
      console.log('IN REDUCER STATE IS:')
      console.log(state.length)
      //if a new like is created
      let new_like = action.payload.data.like
      if (new_like.id > state.length) {
        return [...state, {new_like}]
      }
      //if like is updated
      return state.map(like => {
        if (like.id === action.payload.data.like.id) {
          return {...like, ...action.payload.data.like}
        } else {
          return like
        }
      })
    }
    default:
      return state;
  }
}
import { FETCH_LIKES, POST_LIKED} from '../actions';

export default function likesReducer(state = null, action) {
  switch (action.type) {
    case FETCH_LIKES: {
      return action.payload;
    }
    case POST_LIKED: {
        return action.payload;
      }
    default:
      return state;
  }
}
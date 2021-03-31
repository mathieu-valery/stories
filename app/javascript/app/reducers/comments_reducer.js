import { FETCH_COMMENTS, POST_COMMENT, SET_COMMENTS } from '../actions';

export default function commentsReducer(state = null, action) {
  switch (action.type) {
    case FETCH_COMMENTS: {
      return action.payload;
    }
    case POST_COMMENT:
        if (state.map(comment => comment.id).includes(action.payload.id)) {
            return state;
          } else {
          const copiedState = state.slice(0);
          copiedState.push(action.payload);
          return copiedState;
        }
    case SET_COMMENTS:
      if (state.map(comment => comment.id).includes(action.payload.id)) {
        return state;
      } else {
      const copiedState = state.slice(0);
      copiedState.push(action.payload);
      console.log(copiedState)
      return copiedState;
    }
    default:
      return state;
  }
}
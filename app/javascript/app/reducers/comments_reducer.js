import { FETCH_COMMENTS, POST_COMMENT } from '../actions';

export default function commentsReducer(state = null, action) {
  switch (action.type) {
    case FETCH_COMMENTS: {
      return action.payload;
    }
    case POST_COMMENT:
        console.log(state)
        if (state.map(comment => comment.id).includes(action.payload.id)) {
            return state;
          } else {
          console.log(action.payload)
          const copiedState = state.slice(0);
          copiedState.push(action.payload);
          return copiedState;
        }
    // case MESSAGE_POSTED:
    // if (state.map(message => message.id).includes(action.payload.id)) {
    //     return state;
    //   } else {
    //   const copiedState = state.slice(0);
    //   copiedState.push(action.payload);
    //   return copiedState;
    // }
    // case CHANNEL_SELECTED: {
    //   return []; // Channel has changed. Clearing view.
    // }
    default:
      return state;
  }
}
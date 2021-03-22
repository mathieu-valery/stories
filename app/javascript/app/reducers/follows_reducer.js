import { FETCH_FOLLOWS, USER_FOLLOWED} from '../actions';

export default function followsReducer(state = null, action) {
  switch (action.type) {
    case FETCH_FOLLOWS: {
      return action.payload.data;
    }
    case USER_FOLLOWED: {
      //if a new follow is created
      let new_follow = action.payload.data
      if (!state.some((follow => follow.id === new_follow.id))) {
        return [...state, new_follow]
      }
      //if follow is updated
      return state.map(follow => {
        if (follow.id === action.payload.data.id) {
          return {...follow, ...action.payload.data}
        } else {
          return follow
        }
      })
    }
    default:
      return state;
  }
}
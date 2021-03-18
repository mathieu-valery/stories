import axios from 'axios';
const BASE_URL = '/api/v1';
export const FETCH_POSTS = 'FETCH_POSTS'
export const FETCH_COMMENTS = 'FETCH_COMMENTS'
export const POST_COMMENT = 'POST_COMMENT'

export function fetchPosts() {
  const promise = axios.get(`${BASE_URL}/posts`)
    .then(response => response.data)
    .catch(error => console.log("Error while fetching data : " + error))
  return {
    type: 'FETCH_POSTS',
    payload: promise // Will be resolved by redux-promise
  };
}

export function fetchComments() {
    const promise = axios.get(`${BASE_URL}/comments`)
      .then(response => response.data)
      .catch(error => console.log("Error while fetching data : " + error))
    return {
      type: 'FETCH_COMMENTS',
      payload: promise // Will be resolved by redux-promise
    };
  }

  export function postComment(text, post_id) {

    const url = `${BASE_URL}/comments/${post_id}`;
    const promise = axios.post(url, {body: text})
    .then(() => axios.get(`${BASE_URL}/comments`) //fetch comments
    .then(response => response.data.slice(-1)[0])) //get last comment => the one just created
    .catch(error => console.log("Error while fetching data : " + error))
    return {
      type: 'POST_COMMENT',
      payload: promise // Will be resolved by redux-promise
    };
  }





// export function selectChannel() {
//   return {
//     type: 'CHANNEL_SELECTED'
//   }
// }

// export function appendMessage(message) {
//   return {
//     type: 'MESSAGE_POSTED',
//     payload: message
//   }
// }
  

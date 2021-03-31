import axios from 'axios';

// const BASE_URL = '/api/v1';
export const FETCH_POSTS = 'FETCH_POSTS'
export const FETCH_COMMENTS = 'FETCH_COMMENTS'
export const SET_COMMENTS = 'SET_COMMENTS'
export const FETCH_LIKES = 'FETCH_LIKES'
export const FETCH_USERS = 'FETCH_USERS'
export const FETCH_USER_LOGGED = 'FETCH_USER_LOGGED'
export const POST_COMMENT = 'POST_COMMENT'
export const SET_LIKE = 'SET_LIKE'
export const FETCH_FOLLOWS = 'FETCH_FOLLOWS'
export const USER_FOLLOWED = 'USER_FOLLOWED'

export function fetchPosts() {
  const promise = axios.get(`/posts`) //removed BASE URL
    .then(response => response.data)
    .catch(error => console.log("Error while fetching data : " + error))
  return {
    type: 'FETCH_POSTS',
    payload: promise // Will be resolved by redux-promise
  };
}

export function fetchComments() {
    const promise = axios.get(`/comments`) //removed BASE URL
      .then(response => response.data)
      .catch(error => console.log("Error while fetching data : " + error))
    return {
      type: 'FETCH_COMMENTS',
      payload: promise // Will be resolved by redux-promise
    };
  }

export function setComment(comment) {
  return {
    type: 'SET_COMMENTS',
    payload: comment 
  };
}

  export function fetchLikes() {
    const promise = axios.get(`/likes`) //removed BASE URL
      .then(response => response.data)
      .catch(error => console.log("Error while fetching data : " + error))
    return {
      type: 'FETCH_LIKES',
      payload: promise // Will be resolved by redux-promise
    };
  }

  export function setLike(like) {
    return {
      type: 'SET_LIKE',
      payload: like 
    };
  }

  export function fetchUserLogged() {
    const url = `/user_logged/` //removed BASE URL
    const promise = axios.get(url)
    .then(response => response.data)
    .catch(error => console.log("Error while fetching data : " + error));
    return {
      type: 'FETCH_USER_LOGGED',
      payload: promise // Will be resolved by redux-promise
    };
  }


  export function postComment(text, post_id) {

    const url = `/comments/${post_id}`; //removed BASE URL
    const promise = axios.post(url, {body: text})
    .then(() => axios.get(`${BASE_URL}/comments`) //fetch comments
    .then(response => response.data.slice(-1)[0])) //get last comment => the one just created
    .catch(error => console.log("Error while fetching data : " + error))
    console.log(promise)
    return {
      type: 'POST_COMMENT',
      payload: promise // Will be resolved by redux-promise
    };
  }

  export async function fetchFollows() {

    const url = `/follows/`; //removed BASE URL
    const promise = await axios.get(url)
    return {
      type: 'FETCH_FOLLOWS',
      payload: promise // Will be resolved by redux-promise
    };
  }

  export async function followUser(followed_user_id) {

    const url = `/follows/${followed_user_id}`; //removed BASE URL
    const promise = await axios.post(url)
    return {
      type: 'USER_FOLLOWED',
      payload: promise // Will be resolved by redux-promise
    };
  }

  export async function fetchUsers() {

    const url = `/users/`; //removed BASE URL
    const promise = await axios.get(url)
    return {
      type: 'FETCH_USERS',
      payload: promise // Will be resolved by redux-promise
    };
  }







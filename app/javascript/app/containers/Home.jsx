import React, { useState, useEffect, Component } from 'react'
import FollowersColumn from '../components/FollowersColumn'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import axios from 'axios';
import { fetchPosts, fetchComments, fetchLikes, fetchUserLogged, fetchFollows, fetchUsers } from '../actions/index';
import PostCard from './PostCard'
import UserCard from './UserCard'
import MiniCard from './MiniCard'

const BASE_URL = '/api/v1';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {users: [], user_logged: {}}
  }

  componentDidMount() {
    this.props.fetchPosts()
    this.props.fetchComments();
    this.props.fetchLikes();
    this.props.fetchUserLogged();
    this.props.fetchFollows();
    this.props.fetchUsers();
    axios.get(`${BASE_URL}/users`).then(response => this.setState({users: response.data}))
    axios.get(`${BASE_URL}/user_logged`).then(response => this.setState({user_logged: response.data}))
  }


  render() {

    const user_logged = this.state.user_logged
    const users = this.state.users
    let followed;
    let followed_users;
    let non_followed_users;
    let topFiveFollowing;
    
    //NON-DYNAMIC users filtering => users to go to Suggested users (just on page load)
    if (users.length > 0 && Object.keys(user_logged).length > 0) {

      followed = user_logged.follows.filter((follow) => follow.is_followed === true).map(follow => follow.followed_user)
      followed_users = users.filter(user => {if(followed.some(followed => followed.id==user.id)) return user})
      non_followed_users = users.filter(user => !followed_users.includes(user) && user.id !== user_logged.id )
      
    }

    //DYNAMIC users filtering => users to go to TOP 5 users 
    if (this.props.users.length > 0 && Object.keys(this.props.user_logged).length > 0) {

      followed = this.props.user_logged.follows.filter((follow) => follow.is_followed === true).map(follow => follow.followed_user)
      followed_users = this.props.users.filter(user => {if(followed.some(followed => followed.id==user.id)) return user})
  
      let received_likes_per_users = []
      followed_users.forEach(user => {
        let posts = this.props.posts.filter(post => post.user.id == user.id)
        let received_likes_counts = []
        posts.forEach(post => {
          received_likes_counts.push(post.likes.length)
        })
        received_likes_per_users.push({user: user, likes: received_likes_counts.reduce((a, b) => a + b, 0)})
        })
  
      //needs further testing -- (add users and like to see if top five really works)
      const descending_received_likes = received_likes_per_users.sort((a, b) => a.likes < b.likes ? 1 : -1)
      topFiveFollowing = descending_received_likes.slice(0, 5)

    }


    return (
      <div className="container">
        <div className='your-follows'>
          <h1>Your Top Accounts</h1>
          <h3>top 5 users you follow</h3>
          {topFiveFollowing && 
          topFiveFollowing.map(i => (
            <MiniCard key={i.user.id} user={i.user}/>))
            }
        </div>
        <div className='feed'>
          {this.props.posts.map(post => (
            <PostCard post={post} key={post.id}/>
          ))}
        </div>
        <div className='suggested-box'>
          <h1>Suggested Users</h1>
          {non_followed_users && 
          non_followed_users.map(user => (
            <UserCard key={user.id} user={user}/>))
            }
        </div>
      </div>
    );
  }
}


function mapStateToProps(state) {
  return {
    posts: state.posts,
    user_logged: state.user_logged,
    users: state.users
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ fetchPosts, fetchComments, fetchLikes, fetchUserLogged, fetchFollows, fetchUsers }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
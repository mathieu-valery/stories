import React, { useState, useEffect, Component } from 'react'
import FollowersColumn from '../components/FollowersColumn'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { fetchPosts, fetchComments, fetchLikes, fetchUserLogged, fetchFollows, fetchUsers } from '../actions/index';
import PostCard from './PostCard'
import UserCard from './UserCard'


class Home extends Component {
  constructor(props) {
    super(props);
    
  }

  componentDidMount() {
    this.props.fetchPosts()
    this.props.fetchComments();
    this.props.fetchLikes();
    this.props.fetchUserLogged();
    this.props.fetchFollows();
    this.props.fetchUsers();
  }

  render() {
    const user_logged = this.props.user_logged
    let followers;
    let followers_users;
    let non_followers_users;
    let followed;
    let followed_users;
    let non_followed_users;

    if (this.props.users.length > 0 && Object.keys(user_logged).length > 0) {
      followers = user_logged.received_follows.filter((received_follow) => received_follow.is_followed === true).map(received_follow => received_follow.follower)
      followers_users = this.props.users.filter(user => {if(followers.some(follower => follower.id==user.id)) return user})
      non_followers_users = this.props.users.filter(user => !followers_users.includes(user) && user.id !== user_logged.id )

      followed = user_logged.follows.filter((follow) => follow.is_followed === true).map(follow => follow.follower)
      followed_users = this.props.users.filter(user => {if(followed.some(followed => followed.id==user.id)) return user})
      non_followed_users = this.props.users.filter(user => !followed_users.includes(user) && user.id !== user_logged.id )

    }

    const renderUserCards = () => {
      if (non_followed_users) {
        return non_followed_users.map(user => (
          <UserCard key ={user.id} user={user}/>
        ))
      } else return
    }

    return (
      <div className="container">
          <FollowersColumn/>
          <div className='feed'>
            {this.props.posts.map(post => (
              <PostCard post={post} key={post.id}/>
            ))}
          </div>
          <div className='suggested-box'>
            {renderUserCards()}
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
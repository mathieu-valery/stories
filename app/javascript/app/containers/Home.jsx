import React, { useState, useEffect, Component } from 'react'
import FollowersColumn from '../components/FollowersColumn'
import PostCard from './PostCard'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { fetchPosts, fetchComments, fetchLikes, fetchUserLogged } from '../actions/index';

class Home extends Component {
  componentDidMount() {
    this.props.fetchPosts()
    this.props.fetchComments();
    this.props.fetchLikes();
    this.props.fetchUserLogged();
  }

  render() {
    return (
      <div className="container">
          <FollowersColumn/>
          <div className='feed'>
            {this.props.posts.map(post => (
              <PostCard post={post} key={post.id}/>
            ))}
          </div>
          <div className='suggested-box'></div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    posts: state.posts,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ fetchPosts, fetchComments, fetchLikes, fetchUserLogged }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
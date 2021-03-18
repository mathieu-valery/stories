import React, { useState, useEffect, Component } from 'react'
import FollowersColumn from '../components/FollowersColumn'
import PostCard from '../components/PostCard'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { fetchPosts, fetchComments } from '../actions/index';

class Home extends Component {
  componentDidMount() {
    this.props.fetchPosts()
    this.props.fetchComments();
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
  return bindActionCreators({ fetchPosts, fetchComments }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
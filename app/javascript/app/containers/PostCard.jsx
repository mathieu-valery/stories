import React, {Component} from 'react'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {Image, Video, Transformation, CloudinaryContext} from 'cloudinary-react';
// import Comments from './Comments';
// import CommentsIcon from './CommentsIcon';
// import LikesIcon from './LikesIcon';
import FollowButton from './FollowButton';
import BottomCard from './BottomCard';
import ActionCable from 'actioncable'
import { setComment, setLike } from '../actions/index'

class PostCard extends Component {
  componentDidMount() {
    const cable = ActionCable.createConsumer('ws://localhost:3000/cable');
    cable.subscriptions.create('CommentsChannel', {
      received: this.handleNewComment
    });

    cable.subscriptions.create('LikesChannel', {
      received: this.handleLikePost
    });
  }
  
  // store new data from API
  handleNewComment = ({ comment }) => {
    this.props.setComment(comment)
  }

    // store new data from API
  handleLikePost = ({ like }) => {
    this.props.setLike(like)
  }

    render() {
      let user_logged = this.props.user_logged
      let icconColor = ''
     
      const timestamp = this.props.post.created_at
      const date = timestamp.split('T')[0].split('-').reverse().join('/')
      const hour = timestamp.split('T')[1].split('.')[0]
      
      let follows_of_current_user = this.props.follows.filter(follow => follow.follower.id === this.props.user_logged.id)
      let buttonColor
      let buttonText
      let follow_of_current_user_for_this_post_user = follows_of_current_user.filter(follow => follow.followed_user.id === this.props.post.user.id)[0]
      if (follow_of_current_user_for_this_post_user && follow_of_current_user_for_this_post_user.is_followed) {
        //user logged follow post user
        buttonColor = 'btn btn-light follow-button'
        buttonText = 'Unfollow'
      } else {
        //user logged don't follow post user
        buttonColor = 'btn btn-primary follow-button'
        buttonText = 'Follow'
      }
      
      return (
        <div className='post-card'>
          <p className="card-title"><strong>{this.props.post.caption}</strong></p>
          <div className='flex'>
            <Image className="avatar" cloudName="dg4hemebf" publicId={this.props.post.user.photo_key} width="50" crop="scale" />
            {this.props.post.user.id !== this.props.user_logged.id && 
            <FollowButton user_id={this.props.post.user.id} className={buttonColor} text={buttonText}/>}
          </div>
          <p><em>Posted by {this.props.post.user.username} at {date} {hour}</em></p>
          <Video cloudName="dg4hemebf" publicId={this.props.post.video_key} controls={true} quality="auto" fetchFormat="auto" />
        
          <BottomCard post_id={this.props.post.id} className={icconColor}/>
        </div>
      );
    }
}

function mapStateToProps(state) {
  return {
   user_logged: state.user_logged,
   follows: state.follows,
   likes: state.like
  };
}  

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ setComment, setLike }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(PostCard);


  

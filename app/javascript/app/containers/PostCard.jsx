import React, {Component} from 'react'
import { connect } from 'react-redux';
import {Image, Video, Transformation, CloudinaryContext} from 'cloudinary-react';
// import Comments from './Comments';
// import CommentsIcon from './CommentsIcon';
// import LikesIcon from './LikesIcon';
import FollowButton from './FollowButton';
import BottomCard from './BottomCard';

class PostCard extends Component {

    render() {
      let user_logged = this.props.user_logged
      let icconColor = ''
     
      const timestamp = this.props.post.created_at
      const date = timestamp.split('T')[0].split('-').reverse().join('/')
      const hour = timestamp.split('T')[1].split('.')[0]
      
      if (Object.keys(user_logged).length > 0 ) { //check if state is not empty
      let like_of_user_logged_for_this_post = this.props.user_logged.likes.filter(like => like.post.id == this.props.post.id)[0]
        if (like_of_user_logged_for_this_post && like_of_user_logged_for_this_post.is_liked ) { //check if the user logged has a like set to true for this post
          icconColor = 'blue'
        } else {
          icconColor = 'black'
        }
      }
      
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
   follows: state.follows
  };
}  
export default connect(mapStateToProps)(PostCard);


  

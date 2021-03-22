import React, {Component} from 'react'
import { connect } from 'react-redux';
import {Image, Video, Transformation, CloudinaryContext} from 'cloudinary-react';
import Comments from './Comments';
import CommentsIcon from './CommentsIcon';
import LikesIcon from './LikesIcon';
import FollowButton from './FollowButton';

class PostCard extends Component {

    render() {
      let user_logged = this.props.user_logged
      let icconColor = ''
      let like_of_user_logged_for_this_post = this.props.user_logged.likes.filter(like => like.post.id == this.props.post.id)[0]
      if (Object.keys(user_logged).length > 0 ) { //check if state is not empty
        if (like_of_user_logged_for_this_post && like_of_user_logged_for_this_post.is_liked ) { //check if the user logged has a like set to true for this post
          icconColor = 'blue'
        } else {
          icconColor = 'black'
        }
      }  

      return (
        <div className='card'>
          <p className="card-header"><strong>{this.props.post.caption}</strong></p>
          <Image className="avatar" cloudName="dg4hemebf" publicId={this.props.post.user.photo_key} width="50" crop="scale" />
          <FollowButton/>
          <p><em>Posted by {this.props.post.user.username} at {this.props.post.created_at}</em></p>
          <Video cloudName="dg4hemebf" publicId={this.props.post.video_key} controls={true} quality="auto" fetchFormat="auto" />

          <div className="icons">
            <LikesIcon post_id={this.props.post.id} className={icconColor}/>
            <CommentsIcon post_id={this.props.post.id}/>
          </div>
          <Comments post_id={this.props.post.id}/>
        </div>
      );
    }
}

function mapStateToProps(state) {
  return {
   user_logged: state.user_logged
  };
}  
export default connect(mapStateToProps)(PostCard);


  

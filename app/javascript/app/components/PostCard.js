import React from 'react'
import {Image, Video, Transformation, CloudinaryContext} from 'cloudinary-react';
import Comments from '../containers/Comments';
import CommentsIcon from '../containers/CommentsIcon';
import LikesIcon from '../containers/LikesIcon';

function PostCard({post}) {
    
    return (
      <div className='card'>
        <p className="card-header"><strong>{post.caption}</strong></p>
        <Image className="avatar" cloudName="dg4hemebf" publicId={post.user.photo_key} width="50" crop="scale" />
        <p><em>Posted by {post.user.username} at {post.created_at}</em></p>
        <Video cloudName="dg4hemebf" publicId={post.video_key} controls={true} quality="auto" fetchFormat="auto" />

        <div className="icons">
          <LikesIcon post_id={post.id}/>
          <CommentsIcon post_id={post.id}/>
        </div>
        <Comments post_id={post.id}/>
      </div>
    );
  }
  
  export default PostCard;
import React from 'react'
import {Image, Video, Transformation, CloudinaryContext} from 'cloudinary-react';
import Comments from './Comments';
import Likes from './Likes';

function PostCard({post}) {

    return (
      <div className='card'>
            <p className="card-header"><strong>{post.caption}</strong></p>
            <Image className="avatar" cloudName="dg4hemebf" publicId={post.user.photo_key} width="50" crop="scale" />
            <p><em>Posted by {post.user.username} at {post.created_at}</em></p>
            <Video cloudName="dg4hemebf" publicId={post.video_key} controls={true} quality="auto" fetchFormat="auto" />

            <Likes id={post.id}/>
            <Comments id={post.id}/>
      </div>
    );
  }
  
  export default PostCard;
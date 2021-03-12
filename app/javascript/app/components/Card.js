import React from 'react'
import {Image, Video, Transformation, CloudinaryContext} from 'cloudinary-react';

function Card({post}) {
    return (
      <div className='card'>
            <p className="card-header"><strong>{post.caption}</strong></p>
            <Image className="avatar" cloudName="dg4hemebf" publicId={post.user.image} width="50" crop="scale" />
            <p><em>Posted by {post.user.username} at {post.created_at}</em></p>
            <Video cloudName="dg4hemebf" publicId={post.video} controls={true} crop="scale" />
      </div>
    );
  }
  
  export default Card;

  
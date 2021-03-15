import React from 'react'
import {Image, Video, Transformation, CloudinaryContext} from 'cloudinary-react';
import CommentForm from './CommentForm';

function Card({post}) {
    function likeThisPost() {
      console.log("click")
    }

    function displayComments() {
      const comments = document.querySelector(".comments")
      if (comments.classList.contains('hidden')) {
        comments.classList.remove('hidden')
      } else {
        comments.classList.add('hidden')
      }
    }

    return (
      <div className='card'>
            <p className="card-header"><strong>{post.caption}</strong></p>
            <Image className="avatar" cloudName="dg4hemebf" publicId={post.user.photo_key} width="50" crop="scale" />
            <p><em>Posted by {post.user.username} at {post.created_at}</em></p>
            <Video cloudName="dg4hemebf" publicId={post.video_key} controls={true} quality="auto" fetchFormat="auto" />
            <p onClick={likeThisPost} className="likes_count">Likes: {post.likes.length}</p>
            <p onClick={displayComments} className="comments_count">Comments: {post.comments.length}</p>
            <div className="comments hidden">
              {post.comments.map(comment => (
                <p key={comment.id}><strong>{comment.text} posted by {comment.user.username}</strong></p>
              ))}
            </div>
            <CommentForm id={post.id}/>
      </div>
    );
  }
  
  export default Card;
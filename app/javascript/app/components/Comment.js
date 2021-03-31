import React  from 'react'
import { Image } from 'cloudinary-react';

function Comments({comment}) {

    const date = new Date(comment.created_at).toLocaleDateString()
    const time = new Date(comment.created_at).toLocaleTimeString();

    return (
        <div key={comment.id} className='flex comment'>
            <Image className="avatar" cloudName="dg4hemebf" publicId={comment.user.photo_key} width="50" crop="scale" />
            <p className='comment-content'><strong>{comment.user.username}</strong><em className='comment-date'>{date} {time}</em> <br />{comment.text}</p>
        </div>
    );
}

export default Comments;
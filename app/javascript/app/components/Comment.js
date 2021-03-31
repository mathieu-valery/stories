import React  from 'react'
import { Image } from 'cloudinary-react';

function Comments({comment}) {

    const timestamp = comment.created_at
    const date = timestamp.split('T')[0].split('-').reverse().join('/')
    const hour = timestamp.split('T')[1].split('.')[0]

    return (
        <div key={comment.id} className='flex comment'>
            <Image className="avatar" cloudName="dg4hemebf" publicId={comment.user.photo_key} width="50" crop="scale" />
            <p className='comment-content'><strong>{comment.user.username}</strong><em className='comment-date'> {date} {hour}</em> <br />{comment.text}</p>
        </div>
    );
}

export default Comments;
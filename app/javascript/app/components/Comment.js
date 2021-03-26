import React, { useEffect, useState } from 'react'
import {Image, Video, Transformation, CloudinaryContext} from 'cloudinary-react';

function Comments({comment}) {

    return (
        <div key={comment.id} className='flex comment'>
            <Image className="avatar" cloudName="dg4hemebf" publicId={comment.user.photo_key} width="50" crop="scale" />
            <p className='comment-content'><strong>{comment.user.username}</strong><br />{comment.text}</p>
        </div>
    );
}

export default Comments;
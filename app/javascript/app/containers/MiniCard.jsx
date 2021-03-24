import React, {Component} from 'react'
import {Image, Video, Transformation, CloudinaryContext} from 'cloudinary-react';


class MiniCard extends Component {

    render() {

        return (
            <div className="non-followed-user">
                <p>{this.props.user.username}</p>
                <Image className="avatar" cloudName="dg4hemebf" publicId={this.props.user.photo_key} width="50" crop="scale" />
               
            </div>
        )
    }
}

export default MiniCard
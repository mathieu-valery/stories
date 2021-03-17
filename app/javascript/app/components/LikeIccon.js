import axios from 'axios';
import React, {Component} from 'react'
import { ActionCable } from 'actioncable';
import LikeIccon from './LikeIccon.js'


class Likes extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        let user_logged = this.props.user_logged
        let message
        console.log(this.props.user_logged)
        if (Object.keys(user_logged).length > 0) { //check if props is not empty
            if (this.props.user_logged.likes.filter(like => like.post.id == this.props.post_id)[0].is_liked ) { //check if the user logged has a like set to true for this post
                message = <p className='blue'>You like this post</p>
            } else {  message = <p></p> }
        }
        
        return(
            <div className="like_icon">
                {message}
            </div>
        )
    }
  }
  
  export default Likes;
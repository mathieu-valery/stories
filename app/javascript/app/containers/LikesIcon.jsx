import axios from 'axios';
import React, {Component} from 'react'
import { ActionCable } from 'actioncable';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { LikeThisPost, fetchUserLogged } from '../actions/index'

class LikesIcon extends Component {
    constructor(props) {
        super(props);
    }

    handleClick = async () => {
        await this.props.LikeThisPost(this.props.post_id)
        
    }

    render() {
        console.log('THE PROPS ARE')
        console.log(this.props.likes)
        let filtered_likes = this.props.likes.filter(like => like.post.id == this.props.post_id)
        let classNameIcon = `fas fa-thumbs-up like-icon ${this.props.className}`
        return(
            
            <div className='likes-section'>
                <i id={`button ${this.props.post_id}`} onClick={this.handleClick} className={classNameIcon}></i>
                <p>({filtered_likes.filter(like => like.is_liked).length})</p>
                
            </div>
        )
    }
  }

  function mapStateToProps(state) {
    return {
     likes: state.likes,
     user_logged: state.user_logged
    };
  }
  
  function mapDispatchToProps(dispatch) {
    return bindActionCreators({ LikeThisPost, fetchUserLogged }, dispatch);
  }
  
export default connect(mapStateToProps, mapDispatchToProps)(LikesIcon);

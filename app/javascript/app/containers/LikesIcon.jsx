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

    componentDidMount() {
        this.changeButtonColor();
    }

    handleClick = async () => {
        await this.props.LikeThisPost(this.props.post_id)
        console.log('ok')
        
    }

    componentDidUpdate() {
        this.changeButtonColor(); 
    }

    changeButtonColor = () => {
        let user_logged = this.props.user_logged
        if (Object.keys(user_logged).length > 0) { //check if state is not empty
            if (this.props.user_logged.likes.filter(like => like.post.id == this.props.post_id)[0].is_liked ) { //check if the user logged has a like set to true for this post
                document.getElementById(`button ${this.props.post_id}`).classList.add('blue')
                
            } else {
                document.getElementById(`button ${this.props.post_id}`).classList.remove('blue')
            }
        }  
    }

    render() {
        let filtered_likes = this.props.likes.filter(like => like.post.id == this.props.post_id)

        return(
            
            <div className="likes-section">
                <i id={`button ${this.props.post_id}`} onClick={this.handleClick} className="fas fa-thumbs-up like-icon"></i>
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

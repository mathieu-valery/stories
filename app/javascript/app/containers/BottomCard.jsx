import React, {Component} from 'react'
import axios from 'axios';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { postComment } from '../actions/index'
import Comment from '../components/Comment'

const BASE_URL = '/api/v1';

class BottomCard extends Component {
    constructor(props) {
        super(props);
        this.state = {text: '', comments: [], visible: false}
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleClick = async () => {
        const url = `${BASE_URL}/likes/${this.props.post_id}`;
        await axios.post(url)
    }

    displayComments = () => {
        this.setState(prevState => ({
            visible: !prevState.visible
          }));
      }
    
    handleChange(event) {
        this.setState({text: event.target.value})
    }

    handleSubmit(event) {
        event.preventDefault();
        this.props.postComment(this.state.text, this.props.post_id)
        this.setState({text: ''})
        if (!this.state.visible) this.displayComments();
    }

    componentDidUpdate() {
        
    }

    render() {
        let user_logged = this.props.user_logged
        let likes_for_this_post = this.props.likes.filter(like => like.post.id == this.props.post_id)
        let like_of_user_logged_for_this_post = likes_for_this_post.filter(like => like.user.id == user_logged.id)[0]
        let icconColor
        if (Object.keys(user_logged).length > 0 ) {//check if state is not empty
              if (like_of_user_logged_for_this_post && like_of_user_logged_for_this_post.is_liked ) { //check if the user logged has a like set to true for this post
                icconColor = 'blue'
              } else {
                icconColor = 'black'
              }
        }
        let filtered_comments = this.props.comments.filter(comment => comment.post.id == this.props.post_id)
        let classNameIcon = `fas fa-thumbs-up like-icon ${icconColor}`

        return(
            <div>
                <div className='flex'>
                    <div className='likes-section'>
                        <i id={`button ${this.props.post_id}`} onClick={this.handleClick} className={classNameIcon}></i>
                        <p>({likes_for_this_post.filter(like => like.is_liked).length})</p>
                    </div>

                    <div className="comments-section">
                    <i onClick={this.displayComments} className="fas fa-comments comment-icon"></i>
                    <p className="comments_count">({filtered_comments.length})</p>
                    </div>
                </div>
                <div className="bottom-card">
                <div id={this.props.post_id} className='comments'>
                        {this.state.visible && filtered_comments.map(comment => {
                            return (
                                <Comment key={comment.id} comment={comment} visible={this.state.visible}/>
                            )
                        })}
                </div>
                <form onSubmit={this.handleSubmit}>
                    <input placeholder='Comment' type='text' value={this.state.text} onChange={this.handleChange}></input>
                    <button type='submit'>Send</button>  
                </form>
                </div>
            </div>
        )
    }
  }

  function mapStateToProps(state) {
    return {
     likes: state.likes,
     user_logged: state.user_logged,
     comments: state.comments
    };
  }
  
  function mapDispatchToProps(dispatch) {
    return bindActionCreators({ postComment }, dispatch);
  }
  
export default connect(mapStateToProps, mapDispatchToProps)(BottomCard);

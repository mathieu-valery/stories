import React, {Component} from 'react'
import { ActionCable } from 'actioncable';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { LikeThisPost, postComment } from '../actions/index'
import Comment from '../components/Comment'


class BottomCard extends Component {
    constructor(props) {
        super(props);
        this.state = {text: '', comments: [], visible: false}
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleClick = async () => {
        await this.props.LikeThisPost(this.props.post_id)

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
        this.displayComments();
    }
    render() {
        let filtered_likes = this.props.likes.filter(like => like.post.id == this.props.post_id)
        let filtered_comments = this.props.comments.filter(comment => comment.post.id == this.props.post_id)
        let classNameIcon = `fas fa-thumbs-up like-icon ${this.props.className}`

        return(
            <div>
                <div className='flex'>
                    <div className='likes-section'>
                        <i id={`button ${this.props.post_id}`} onClick={this.handleClick} className={classNameIcon}></i>
                        <p>({filtered_likes.filter(like => like.is_liked).length})</p>
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
    return bindActionCreators({ LikeThisPost, postComment }, dispatch);
  }
  
export default connect(mapStateToProps, mapDispatchToProps)(BottomCard);

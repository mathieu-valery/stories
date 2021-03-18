import axios from 'axios';
import React, {Component} from 'react'
import { ActionCable } from 'actioncable';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { postComment } from '../actions/index';

class Comments extends Component {
    constructor(props) {
        super(props);
        this.state = {text: '', comments: []}
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        
    }

    handleChange(event) {
        this.setState({text: event.target.value})
    }

    handleSubmit(event) {
        event.preventDefault();
        this.props.postComment(this.state.text, this.props.post_id)
    }

    displayComments = () => {
        const comments = document.getElementById(this.props.post_id)
      
        if (comments.classList.contains('hidden')) {
          comments.classList.remove('hidden')
        } else {
          comments.classList.add('hidden')
        }
      }

    render() {
        
      let filtered_comments = this.props.comments.filter(comment => comment.post.id == this.props.post_id)  
      
        return(
            <div className="bottom-card">
                <div id={this.props.post_id} className='comments hidden'>
                        {filtered_comments.map(comment => {
                            return <p key={comment.id}><strong>{comment.text} posted by {comment.user.username}</strong></p>
                        })}
                </div>
                <form onSubmit={this.handleSubmit}>
                    <input type='text' value={this.state.text} onChange={this.handleChange}></input>
                    <button type='submit'>Send</button>  
                </form>
            </div>
        )
    }
  }
  
  function mapStateToProps(state) {
    return {
      comments: state.comments,
    };
  }
  
  function mapDispatchToProps(dispatch) {
    return bindActionCreators({ postComment }, dispatch);
  }
  
  export default connect(mapStateToProps, mapDispatchToProps)(Comments);

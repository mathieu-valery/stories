import axios from 'axios';
import React, {Component} from 'react'
import { ActionCable } from 'actioncable';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {Image, Video, Transformation, CloudinaryContext} from 'cloudinary-react';
import { postComment } from '../actions/index';


class Comments extends Component {
    constructor(props) {
        super(props);
        this.state = {text: '', comments: [], visible: false}
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        
    }

    handleChange(event) {
        this.setState({text: event.target.value})
    }

    handleSubmit(event) {
        event.preventDefault();
        this.props.postComment(this.state.text, this.props.post_id)
        this.setState({text: ''})
        this.displayHiddenComments();
    }

    displayHiddenComments = () => {
        const comments = document.getElementById(this.props.post_id)
        if (comments.classList.contains('hidden')) {
          comments.classList.remove('hidden')
        }
      }

    render() {
        
      let filtered_comments = this.props.comments.filter(comment => comment.post.id == this.props.post_id)  
      
        return(
            <div className="bottom-card">
                <div id={this.props.post_id} className='comments hidden'>
                        {filtered_comments.map(comment => {
                            return (
                              <div key={comment.id} className='flex comment'>
                                <Image className="avatar" cloudName="dg4hemebf" publicId={comment.user.photo_key} width="50" crop="scale" />
                                <p className='comment-content'><strong>{comment.user.username}</strong><br />{comment.text}</p>
                              </div>
                            )
                        })}
                </div>
                <form onSubmit={this.handleSubmit}>
                    <input placeholder='Comment' type='text' value={this.state.text} onChange={this.handleChange}></input>
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

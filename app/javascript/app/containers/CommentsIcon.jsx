import axios from 'axios';
import React, {Component} from 'react'
import { ActionCable } from 'actioncable';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';



class Comments extends Component {
    constructor(props) {
        super(props);
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
                <div className="comments-section">
                    <i onClick={this.displayComments} className="fas fa-comments comment-icon"></i>
                    <p className="comments_count">({filtered_comments.length})</p>
                </div>
        )
    }
  }
  
  function mapStateToProps(state) {
    return {
      comments: state.comments,
    };
  }
  
  export default connect(mapStateToProps)(Comments);

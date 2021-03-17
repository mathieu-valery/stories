import axios from 'axios';
import React, {Component} from 'react'
import { ActionCable } from 'actioncable';

const BASE_URL = '/api/v1'

class Comments extends Component {
    constructor(props) {
        super(props);
        this.state = {value: '', comments: []}
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        
    }

    componentDidMount() {
        this.fetchComments();
    }

    handleChange(event) {
        this.setState({value: event.target.value})
    }

    fetchComments = () => {
        const url = `${BASE_URL}/comments/`
        axios.get(url)
        .then(response => {
            this.setState({comments: response.data.filter(comment => comment.post.id == this.props.id)})    
        })
        .catch(error => console.log("Error while fetching data : " + error));
    }

    handleSubmit(event) {
        
        const url = `${BASE_URL}/comments/${this.props.id}`;
        event.preventDefault();
        axios.post(url, {body: this.state.value})
        .then(() => {
            this.setState({value: ''})
            this.fetchComments();
            this.displayComments();
        })
        .catch(error => {
            console.log("ERRRR:: ",error.response.data);
        });   
    }

    displayComments = () => {
        const comments = document.getElementById(this.props.id)
      
        if (comments.classList.contains('hidden')) {
          comments.classList.remove('hidden')
        } else {
          comments.classList.add('hidden')
        }
      }
    
    render() {
 
        return(
            <div className="comments_section">
                <p onClick={this.displayComments} className="comments_count">Comments: {this.state.comments.length}</p>
                    <div id={this.props.id} className='comments hidden'>
                    {this.state.comments.map(comment => {
                        return <p key={comment.id}><strong>{comment.text} posted by {comment.user.username}</strong></p>
                    })}
                    </div>
                <form onSubmit={this.handleSubmit}>
                    <input type='text' value={this.state.value} onChange={this.handleChange}></input>
                    <button type='submit'>Send</button>  
                </form>
            </div>
        )
    }
  }
  
  export default Comments;
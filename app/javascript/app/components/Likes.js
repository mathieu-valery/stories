import axios from 'axios';
import React, {Component} from 'react'
import { ActionCable } from 'actioncable';

const BASE_URL = '/api/v1'

class Likes extends Component {
    constructor(props) {
        super(props);
        this.state = {likes: []}
    }

    componentDidMount() {
        this.fetchLikes();
    }

    handleClick = () => {
        const url = `${BASE_URL}/likes/${this.props.id}`;
        
        axios.post(url)
        .then(() => {  
            this.fetchLikes();
        })
        .catch(error => {
            console.log("ERRRR:: ",error.response.data);
        });  
    }

    fetchLikes = () => {
        const url = `${BASE_URL}/likes/`
        axios.get(url)
        .then(response => {
            this.setState({likes: response.data.filter(like => like.post.id == this.props.id)})    
        })
        .catch(error => console.log("Error while fetching data : " + error));
    }

    render() {
 
        return(
            <div className="likes">
                <p>Likes : {this.state.likes.filter(like => like.is_liked).length}</p>
                <button onClick={this.handleClick}>Like</button>

            </div>
        )
    }
  }
  
  export default Likes;
import axios from 'axios';
import React, {Component} from 'react'
import { ActionCable } from 'actioncable';
import LikeIccon from './LikeIccon.js'

const BASE_URL = '/api/v1'

class Likes extends Component {
    constructor(props) {
        super(props);
        this.state = {likes: [], user_logged: {}}
    }

    componentDidMount() {
        this.fetchLikes();
        this.fetchUserLogged();
    }

    handleClick = () => {
        const url = `${BASE_URL}/likes/${this.props.id}`;
        
        axios.post(url)
        .then(() => {  
            this.fetchLikes();
            this.fetchUserLogged();
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

    fetchUserLogged = () => {
        const url = `${BASE_URL}/user_logged/`
        axios.get(url)
        .then(response => {
            this.setState({user_logged: response.data})    
        })
        .catch(error => console.log("Error while fetching data : " + error));
    }

    render() {
        
        return(
            
            <div className="likes">
                <p>Likes : {this.state.likes.filter(like => like.is_liked).length}</p>
                <button onClick={this.handleClick}>Like</button>
                <LikeIccon user_logged={this.state.user_logged} post_id={this.props.id}/>
            </div>
        )
    }
  }
  
  export default Likes;
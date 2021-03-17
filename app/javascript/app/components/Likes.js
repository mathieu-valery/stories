import axios from 'axios';
import React, {Component} from 'react'
import { ActionCable } from 'actioncable';


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

    changeButtonColor = () => {
        let user_logged = this.state.user_logged

        if (Object.keys(user_logged).length > 0) { //check if state is not empty
            console.log(this.state.user_logged.likes )
            if (this.state.user_logged.likes.filter(like => like.post.id == this.props.id)[0].is_liked ) { //check if the user logged has a like set to true for this post
                document.getElementById(`button ${this.props.id}`).classList.add('blue')
                
            } else {
                document.getElementById(`button ${this.props.id}`).classList.remove('blue')
            }
        }  
    }

    componentWillUpdate() {
        this.changeButtonColor();
    }

    render() {
        return(
            
            <div className="likes-section">
                <i id={`button ${this.props.id}`} onClick={this.handleClick} className="fas fa-thumbs-up like-icon"></i>
                <p>({this.state.likes.filter(like => like.is_liked).length})</p>
                
            </div>
        )
    }
  }
  
  export default Likes;
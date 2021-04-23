import React, { Component } from 'react'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchUsers } from '../actions/index';
import axios from 'axios';
import { Image, Video } from 'cloudinary-react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams
} from "react-router-dom";

const BASE_URL = '/api/v1';

class User extends Component {
    constructor(props) {
        super(props);
        this.state = {user: {}, posts: [], follows: [], receivedFollows: [], receivedLikes: [], user_logged: {}}
    }

    componentDidMount(){
        axios.get(`${BASE_URL}/users`)
        .then(response => 
            this.setState({
            user: response.data.find(user => user.id == this.props.match.params.id),
            posts: response.data.find(user => user.id == this.props.match.params.id).posts,
            follows: response.data.find(user => user.id == this.props.match.params.id).follows,
            receivedFollows: response.data.find(user => user.id == this.props.match.params.id).received_follows,
            receivedLikes: response.data.find(user => user.id == this.props.match.params.id).received_likes,
        }));
        axios.get(`${BASE_URL}/user_logged`).then(response => this.setState({user_logged: response.data}));
    }
    
    render() {
    let editProfileLink 
    if (this.state.user.id == this.state.user_logged.id) {
        editProfileLink = 
        <div className='flex center padding-bottom-20'>
            <a className='edit-profile-link' href='/users/edit'>
                <button className='edit-profil-btn'><strong>Edit profile</strong></button>
            </a>
            <a className='upload-video-link' href='/posts/new'>
                <button className='edit-profil-btn'><strong>Upload video</strong></button>
            </a>
        </div>
    } else {
        editProfileLink = <div></div>
    }

        return (
        
            <div className='container-user-page'>
                <div className='flex column items-center'>
                    <Image className="avatar-large" cloudName="dg4hemebf" publicId={this.state.user.photo_key} width="50"  />
                    <h2 className='username-user-page padding-top-10'>{this.state.user.username}</h2>  
                </div>
                <div className='flex space-evenly padding-bottom-20'>
                        <div className='flex column items-center'>
                            <p className='count-font-size'><strong>{this.state.follows.filter(follow => follow.is_followed).length}</strong></p>
                            <p>Following</p>
                        </div >
                        <div className='flex column items-center'>
                            <p className='count-font-size'><strong>{this.state.receivedFollows.filter(follow => follow.is_followed).length}</strong></p>
                            <p>Followers</p>
                        </div>
                        <div className='flex column items-center'>
                            <p className='count-font-size'><strong>{this.state.receivedLikes.filter(follow => follow.is_liked).length}</strong></p>
                            <p>Likes</p>
                        </div>
                </div>
                {editProfileLink}
                <div className='grid'>
                    {this.state.posts
                        .map(post => (<Video className='justify-center' key={post.id} cloudName="dg4hemebf" publicId={post.video_key} controls={true} quality="auto" fetchFormat="auto" />))
                    }
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
      users: state.users
    };
  }

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ fetchUsers }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(User);

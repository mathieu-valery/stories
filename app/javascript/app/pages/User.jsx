import React, { Component } from 'react'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchUsers } from '../actions/index';
import axios from 'axios';
import { Image } from 'cloudinary-react';
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
        <div className='flex center'>
            <a href='/users/edit'>Edit My Profile</a>
        </div>
    } else {
        editProfileLink = <div></div>
    }

        return (
            <div className='container-user-page'>
                <div className='flex center'>
            
                    <Image className="avatar-large" cloudName="dg4hemebf" publicId={this.state.user.photo_key} width="50"  />
                        
                </div>
                <div className='flex center'>
                    <h3 className='username-user-page'>{this.state.user.username}</h3>
                </div>
                <div className='flex space-evenly'>
                        <div className='flex column items-center'>
                            <p>{this.state.follows.filter(follow => follow.is_followed).length}</p>
                            <p>Following</p>
                        </div >
                        <div className='flex column items-center'>
                            <p>{this.state.receivedFollows.filter(follow => follow.is_followed).length}</p>
                            <p>Followers</p>
                        </div>
                        <div className='flex column items-center'>
                            <p>{this.state.receivedLikes.filter(follow => follow.is_liked).length}</p>
                            <p>Likes</p>
                        </div>
                </div>
                {editProfileLink}
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

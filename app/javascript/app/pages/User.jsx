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
        this.state = {user: {}, posts: [], follows: [], receivedFollows: []}
    }

    componentDidMount(){
        axios.get(`${BASE_URL}/users`)
        .then(response => 
            this.setState({
            user: response.data.find(user => user.id == this.props.match.params.id),
            posts: response.data.find(user => user.id == this.props.match.params.id).posts,
            follows: response.data.find(user => user.id == this.props.match.params.id).follows,
            receivedFollows: response.data.find(user => user.id == this.props.match.params.id).received_follows,
        }))

    }
    
    render() {
    console.log(this.state.user)
        return (
            <div>
                 <Image className="avatar" cloudName="dg4hemebf" publicId={this.state.user.photo_key} width="50" crop="scale" />
                <h3>{this.state.user.username}</h3>
                <p>Posts : {this.state.posts.length}</p>
                <p>Following : {this.state.follows.filter(follow => follow.is_followed == true).length}</p>
                <p>Followers: {this.state.receivedFollows.filter(follow => follow.is_followed == true).length}</p>
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

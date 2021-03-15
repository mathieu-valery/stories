import axios from 'axios';
import React, {Component} from 'react'

class CommentForm extends Component {
    constructor(props) {
        super(props);
        this.state = {value: ''}
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({value: event.target.value})
    }

    handleSubmit(event) {
        const base_url = '/api/v1'
        const url = `${base_url}/comments/${this.props.id}`; //not really working => it is posting on api/v1/comments instead
        event.preventDefault();
        axios.post(url, {body: this.state.value})
        .then(response => {
            console.log(response.data)
        })
        .catch(error => {
            console.log("ERRRR:: ",error.response.data);
        });   
    }

    render() {
        return(
            <form onSubmit={this.handleSubmit}>
                <input type='text' value={this.state.value} onChange={this.handleChange}></input>
                <button type='submit'>Send</button>
            </form>
        )
    }
  }
  
  export default CommentForm;
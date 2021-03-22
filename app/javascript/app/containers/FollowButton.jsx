import React, {Component} from 'react'
import { ActionCable } from 'actioncable';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { followUser } from '../actions/index'



class FollowButton extends Component {
    constructor(props) {
        super(props);
    }


    handleClick = () => {
        this.props.followUser(this.props.user_id)
      }

    render() {
        
      
        return(
                <div className="follow-button">
                    <button type="button" onClick={this.handleClick} className={this.props.className}>{this.props.text}</button>
                </div>
        )
    }
  }
  
  function mapStateToProps(state) {
    return {
        user_logged: state.user_logged
    };
  }

  function mapDispatchToProps(dispatch) {
    return bindActionCreators({ followUser }, dispatch);
  }
  
  export default connect(mapStateToProps, mapDispatchToProps)(FollowButton);

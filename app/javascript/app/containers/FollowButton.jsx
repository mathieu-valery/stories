import React, {Component} from 'react'
import { ActionCable } from 'actioncable';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';



class FollowButton extends Component {
    constructor(props) {
        super(props);
    }


    handleClick = () => {
        console.log('clicked')
      }

    render() {
        
      
        return(
                <div className="follow-button">
                    <button onClick={this.handleClick}>Follow</button>
                </div>
        )
    }
  }
  
  function mapStateToProps(state) {
    return {
        user_logged: state.user_logged
    };
  }
  
  export default connect(mapStateToProps)(FollowButton);

import React, { Component } from 'react';
import { connect } from 'react-redux';
import Sidebar from './Sidebar';
import Board from './Board';
import Popup from './PopUp';
import axios from 'axios';

const mapStateToProps = state => {
  if (state.hasUser) {
    return { 
      hasUser: state.hasUser,
      showPop: state.projects[state.projects.active].data.showPop
     };
    } else {
      return {
        hasUser: state.hasUser
      }
    }
  };

  const mapDispatchToProps = dispatch => {
    return {
    }
  }


class Main extends Component {

  componentDidMount() {
    axios.get('/data/pull')
        .then(response => {
            console.log(response)
        })
        .catch(function (error){
            console.log(error);
        }) 
  }

  render() {
    return (
        <div>
          {this.props.hasUser ?
          <div>
            <Sidebar />
            <Board />
            {this.props.showPop ?
            <Popup /> : null}
          </div>
            : 
            <p>loading</p>
          }
        </div>     
    )
   }
}

export default connect(mapStateToProps, mapDispatchToProps)(Main);
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Sidebar from './Sidebar';
import Board from './Board';
import Popup from './PopUp';
import { fetchBoard } from '../actions/actionsAPI'
import axios from 'axios';

const mapStateToProps = state => {
  console.log(state)
  if (!state.boardReducer.loading) {
    return { 
      board: state.boardReducer,
      hasUser: state.userReducer.hasUser,
      showPop: state.boardReducer.projects[state.boardReducer.projects.active].data.showPop,
      userId: state.boardReducer.userId
     };
    } else {
      return {
        loading: state.boardReducer.loading
      }
    }
  };

  const mapDispatchToProps = dispatch => {
    return {
      fetchBoard: a => dispatch(fetchBoard(a))
    }
  }


class Main extends Component {

  componentDidMount() {
      this.props.fetchBoard()
  }

  render() {
    console.log(this.props)
    return (
        <div>
          {!this.props.loading ?
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
import React from 'react';
import { connect } from 'react-redux';
import Sidebar from './Sidebar';
import Board from './Board';
import Popup from './PopUp';

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

const Main = (props) => {

    return (
        <div>
          {props.hasUser ?
          <div>
            <Sidebar />
            <Board />
            {props.showPop ?
            <Popup /> : null}
          </div>
            : 
            <p>loading</p>
          }
        </div>
       
    )
}

export default connect(mapStateToProps, mapDispatchToProps)(Main);
import React from 'react';
import { connect } from 'react-redux';
import Sidebar from './Sidebar';
import Board from './Board';
import Popup from './PopUp';

const mapStateToProps = state => {
    return { 
      showPop: state.projects[state.projects.active].data.showPop
     };
  };

  const mapDispatchToProps = dispatch => {
    return {
    }
  }

const Main = (props) => {

    return (
        <div>
            <Sidebar />
            <Board />
            {props.showPop ?
            <Popup /> : null}
        </div>
    )
}

export default connect(mapStateToProps, mapDispatchToProps)(Main);
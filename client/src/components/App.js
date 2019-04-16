import React, { Component } from 'react';
import Popup from './PopUp';
import Sidebar from './Sidebar';
import Board from './Board'
import { connect } from "react-redux"; 
import { togglePopUp, moveToDo, editProjectTempTitle, editProjectTitle } from '../actions/index';
import axios from 'axios';
import '../App.css';

const mapStateToProps = state => {
  return { 
    showPop: state.projects[state.projects.active].data.showPop
   };
};

const mapDispatchToProps = dispatch => {
  return {
  }
}


class App extends Component {
  constructor(props) {
    super(props)

  }

  componentDidMount() {
    axios.get('http://localhost:4000/data/pull')
        .then(response => {
            console.log(response)
            this.setState(response);
        })
        .catch(function (error){
            console.log(error);
        })
  }


  toggleTempTitle = () => {
    this.setState({showTempProjTitle: !this.state.showTempProjTitle})
  }

  render() {
    console.log(this.props)
    return (
      <div>
        <Sidebar />
        <Board />
        {this.props.showPop ?
        <Popup /> : null}
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);



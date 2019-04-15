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
    projects: state.projects,
    tempProjTitle: state.projects[state.projects.active].tempProjTitle,
    todo: state.projects[state.projects.active].data.todo,
    columns: state.projects[state.projects.active].data.columns,
    showPop: state.projects[state.projects.active].data.showPop,
    columnsort: state.projects[state.projects.active].data.columnsort
   };
};

const mapDispatchToProps = dispatch => {
  return {
    togglePop: pop => dispatch(togglePopUp(pop)),
    moveToDo: todo => dispatch(moveToDo(todo)),
    editProjectTempTitle: title => dispatch(editProjectTempTitle(title)),
    editProjectTitle: title => dispatch(editProjectTitle(title))
  }
}


class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      tempProjTitle: '',
      showTempProjTitle: false
    }
    this.togglePop = this.togglePop.bind(this);
    this.toggleTempTitle = this.toggleTempTitle.bind(this);
  }


  onDragEnd = result => {
    const {destination, source, draggableId} = result;
    if (!destination) {
      return
    } 
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }
    const begin = this.props.columns[source.droppableId];
    const end = this.props.columns[destination.droppableId];
    let beginToDoIds = begin.todoId;
    let endToDoIds = end.todoId;
    this.props.moveToDo({destination, begin, end, beginToDoIds, endToDoIds, draggableId, source})
  }

  togglePop = () => {
    let test = !this.props.showPop
    this.props.togglePop({test});
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



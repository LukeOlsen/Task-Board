import React, { Component } from 'react';
import Column from './Column';
import { connect } from "react-redux";
import {DragDropContext} from 'react-beautiful-dnd'; 
import Button from '@material-ui/core/Button';
import { moveToDo, editProjectTempTitle, editProjectTitle, togglePopUp } from '../actions/index';
import TextField from '@material-ui/core/TextField';
import CircularProgress from '@material-ui/core/CircularProgress';
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


class Board extends Component {
  constructor(props) {
    super(props)

    this.state = {
      tempProjTitle: '',
      showTempProjTitle: false
    }

    this.onDragEnd = this.onDragEnd.bind(this);
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
        <div className="header">
        {this.state.showTempProjTitle ? 
          <form>
            <TextField
              variant="outlined"
              value={this.props.tempProjTitle}
              onChange={event => this.props.editProjectTempTitle(event.target.value)}
            />
            <Button size="small" onClick={() => {
              this.props.editProjectTitle();
              this.toggleTempTitle();
              }}>Change Title</Button>
          </form>
          :
          <h1 onClick={this.toggleTempTitle}>{this.props.projects[this.props.projects.active].title}</h1>
          }
        <Button variant="contained" color="primary" onClick={this.togglePop}>New Task</Button>
        </div>
        <div className="mainContainer">
        {this.props ? 
          <DragDropContext onDragEnd={this.onDragEnd}>
            {this.props.columnsort.map(columnId => {
              const column = this.props.columns[columnId];
              const todos = column.todoId.map(todoId => this.props.todo[todoId]);
              return <Column key={column.id} column={column} todos={todos} />;
            })}
          </DragDropContext>
        : 
          <CircularProgress />
        }
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Board);
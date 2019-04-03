import React, { Component } from 'react';
import Column from './Column';
import Popup from './PopUp';
import Sidebar from './Sidebar';
import { connect } from "react-redux";
import {DragDropContext} from 'react-beautiful-dnd'; 
import Button from '@material-ui/core/Button';
import { togglePopUp, moveToDo } from '../actions/index';
import '../App.css';

const mapStateToProps = state => {
  return { 
    todo: state.todo,
    columns: state.columns,
    columnsort: state.columnsort,
    showPop: state.showPop
   };
};

const mapDispatchToProps = dispatch => {
  return {
    togglePop: pop => dispatch(togglePopUp(pop)),
    moveToDo: todo => dispatch(moveToDo(todo))
  }
}

class App extends Component {
  constructor(props) {
    super(props)

    this.onDragEnd = this.onDragEnd.bind(this);
    this.togglePop = this.togglePop.bind(this);
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

  render() {
    return (
      <div>
        <div className="header">
        <h1>Test</h1>
        <Button variant="contained" color="primary" onClick={this.togglePop}>New Task</Button>
        </div>
        <Sidebar />
        <div className="mainContainer">
          <DragDropContext onDragEnd={this.onDragEnd}>
              {this.props.columnsort.map(columnId => {
                const column = this.props.columns[columnId];
                const todos = column.todoId.map(todoId => this.props.todo[todoId]);
                return <Column key={column.id} column={column} todos={todos} />;
              })}
          </DragDropContext>
        </div>
        {this.props.showPop ?
        <Popup /> : null}
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);



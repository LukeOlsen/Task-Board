import React, { Component } from 'react';
import Data from './Data';
import ToDo from './ToDo';
import Completed from './Completed';
import Working from './Working';
import {DragDropContext} from 'react-beautiful-dnd'; 
import './App.css';

class App extends Component {
  constructor(props) {
    super(props)

    this.state = Data;
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
    const column = this.state.columns[source.droppableId];
    const newToDoIds = Array.from(column.todoIds);
    newToDoIds.splice(source.index, 1);
    newToDoIds.splice(destination.index, 0, draggableId);
    const newColumn = {
      ...column,
      todoIds: newTodoIds,
    };
    const newState = {
      ...this.state,
      columns: {
        ...this.state.columns,
        [newColumn.id]: newColumn,
      },
    };
    this.setState(newState);
  }


  render() {
    return (
      <DragDropContext onDragEnd={this.onDragEnd}>
        {this.state.columnsort.map(columnId => {
          const column = this.state.columns[columnId];
          const todos = column.todo.map(todoId => this.state.todo[todoID]);
          return <Column key={column.id} column={column} todos={todos} />;
        })}
      </DragDropContext>
    );
  }
}

export default App;

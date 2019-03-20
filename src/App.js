import React, { Component } from 'react';
import Data from './Data';
import Column from './Column';
import {DragDropContext} from 'react-beautiful-dnd'; 
import './App.css';

class App extends Component {
  constructor(props) {
    super(props)

    this.state = Data;
    this.onDragEnd = this.onDragEnd.bind(this)
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
    const newToDoIds = Array.from(column.todoId);
    newToDoIds.splice(source.index, 1);
    newToDoIds.splice(destination.index, 0, draggableId);
    const newColumn = {
      ...column,
      todoId: newToDoIds,
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
      <div>
        <h1>Test</h1>
        <div className="mainContainer">
          <DragDropContext onDragEnd={this.onDragEnd}>
            {this.state.columnsort.map(columnId => {
              const column = this.state.columns[columnId];
              const todos = column.todoId.map(todoId => this.state.todo[todoId]);
              return <Column key={column.id} column={column} todos={todos} />;
            })}
          </DragDropContext>
        </div>
      </div>
    );
  }
}

export default App;

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

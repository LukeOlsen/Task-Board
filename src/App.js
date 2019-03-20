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
    const begin = this.state.columns[source.droppableId];
    console.log(begin);
    const end = this.state.columns[destination.droppableId];
    console.log(end)
    if (begin === end){
    const newToDoIds = Array.from(begin.todoId);
    newToDoIds.splice(source.index, 1);
    newToDoIds.splice(destination.index, 0, draggableId);
    const newColumn = {
      ...begin,
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
    return
    }
    if (begin !== end ) {
      const beginToDoIds = Array.from(begin.todoId);
      beginToDoIds.splice(source.index, 1);
      const newBegin = {
        ...begin,
        todoId: beginToDoIds
      }
      const endToDoIds = Array.from(end.todoId);
      endToDoIds.splice(destination.index, 0, draggableId);
      const newEnd = {
        ...end,
        todoId: endToDoIds
      }
      const newState = {
        ...this.state,
        columns: {
          ...this.state.columns,
          [newBegin.id]: newBegin,
          [newEnd.id]: newEnd,
        }
      }
      this.setState(newState)
    }
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

import React, { Component } from 'react';
import Data from './Data';
import Column from './Column';
import Popup from './PopUp';
import {DragDropContext} from 'react-beautiful-dnd'; 
import './App.css';

class App extends Component {
  constructor(props) {
    super(props)

    this.state = Data;
    this.onDragEnd = this.onDragEnd.bind(this);
    this.addToDo = this.addToDo.bind(this);
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
    const begin = this.state.columns[source.droppableId];
    const end = this.state.columns[destination.droppableId];
    if (begin === end){
    const newToDoIds = Array.from(begin.todoId);
    newToDoIds.splice(source.index, 1);
    newToDoIds.splice(destination.index, 0, draggableId);
    const newColumn = {
      ...begin,
      todoId: newToDoIds,
    };
    console.log(newColumn)
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
      console.log(newBegin)
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
      console.log(newState)
      this.setState(newState)
    }
  }

  addToDo = () => {
    console.log(`${this.state.count}`)
    let r = this.state.count+1;
    let newState = this.state;
    newState.todo = {
      ...newState.todo,
      [r]: {
        id: `${r}`,
        title: 'temp'
      }
     };
    newState.columns['col-1'].todoId = [...newState.columns['col-1'].todoId, `${r}`];
    newState.count = newState.count+1;
    this.setState(newState);
  }

  togglePop = () => {
    this.setState({showPop: !this.state.showPop})
  }


  render() {
    return (
      <div>
        <h1>Test</h1>
        <div className="mainContainer">
        <div><button onClick={this.togglePop}>showpop</button></div>
        <div><button onClick={this.addToDo}>Create New ToDo</button></div>
          <DragDropContext onDragEnd={this.onDragEnd}>
              {this.state.columnsort.map(columnId => {
                const column = this.state.columns[columnId];
                const todos = column.todoId.map(todoId => this.state.todo[todoId]);
                return <Column key={column.id} column={column} todos={todos} />;
              })}
          </DragDropContext>
        </div>
        {this.state.showPop ?
        <Popup toggle={this.togglePop} /> : null}
      </div>
    );
  }
}

export default App;

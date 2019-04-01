import React, { Component } from 'react';
import Data from './Data';
import Column from './Column';
import Popup from './PopUp';
import Sidebar from './Sidebar';
import {DragDropContext} from 'react-beautiful-dnd'; 
import Button from '@material-ui/core/Button';
import './App.css';
import { runInThisContext } from 'vm';

class App extends Component {
  constructor(props) {
    super(props)

    this.state = Data;
    this.onDragEnd = this.onDragEnd.bind(this);
    this.addToDo = this.addToDo.bind(this);
    this.togglePop = this.togglePop.bind(this);
    this.handleTitleChange = this.handleTitleChange.bind(this);
    this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
    this.handleDateChange = this.handleDateChange.bind(this);
    this.editCard = this.editCard.bind(this);
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
    if (this.state.edit === false) {
      if (this.state.tempTitle !== '' && this.state.tempTitle !== null) {
        console.log(`${this.state.count}`)
        let r = this.state.count+1;
        let newState = this.state;
        let tempTitle = this.state.tempTitle;
        let tempDescription = this.state.tempDescription;
        let tempDate = this.state.tempDate;
        newState.todo = {
          ...newState.todo,
          [r]: {
            id: `${r}`,
            title: tempTitle,
            description: tempDescription,
            date: tempDate,
            complete: false

          }
        };
        newState.columns['col-1'].todoId = [...newState.columns['col-1'].todoId, `${r}`];
        newState.count = newState.count+1;
        newState.showPop = false;
        newState.tempDate = '';
        newState.tempDescription = '';
        newState.tempTitle = '';
        this.setState(newState);
      } else {
        alert("Please enter a title");
      }
    } else if (this.state.edit === true) {
      let newState = this.state;
      newState.todo[newState.currentEditId].title = newState.tempTitle;
      newState.todo[newState.currentEditId].description = newState.tempDescription;
      newState.todo[newState.currentEditId].date = newState.tempDate;
      newState.tempDate = '';
      newState.tempDescription = '';
      newState.tempTitle = '';
      newState.edit = false;
      newState.currentEditId = '';
      newState.showPop = false;
      this.setState(newState);
    }
  }

  togglePop = () => {
    let newState = this.state;
    newState.showPop = !this.state.showPop;
    newState.tempDate = '';
    newState.tempDescription = '';
    newState.tempTitle = '';
    this.setState(newState)
  }

  handleTitleChange = tempTitle => {
    this.setState({tempTitle});
  }

  handleDateChange = tempDate => {
    this.setState({tempDate});
  }

  handleDescriptionChange = tempDescription => {
    this.setState({tempDescription})
  }

  editCard = (l) => {
    console.log("working");
    let newState = this.state;
    console.log(newState);
    console.log(l)
    newState.edit = true;
    newState.tempTitle = this.state.todo[l].title;
    newState.tempDescription = this.state.todo[l].description;
    newState.tempDate = this.state.todo[l].date;
    newState.currentEditId = l;
    newState.showPop = true;
    console.log(newState);
    this.setState(newState);
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
              {this.state.columnsort.map(columnId => {
                const column = this.state.columns[columnId];
                const todos = column.todoId.map(todoId => this.state.todo[todoId]);
                return <Column key={column.id} column={column} todos={todos} editCard={this.editCard} />;
              })}
          </DragDropContext>
        </div>
        {this.state.showPop ?
        <Popup     
          toggle={this.togglePop} 
          handleTitleChange={this.handleTitleChange}
          handleDateChange={this.handleDateChange}
          handleDescriptionChange={this.handleDescriptionChange}
          tempTitle={this.state.tempTitle}
          tempDate={this.state.tempDate}
          tempDescription={this.state.tempDescription}
          addToDo={this.addToDo}
          editCard={this.editCard}
        /> : null}
      </div>
    );
  }
}

export default App;

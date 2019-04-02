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

    //this.state = Data;
    this.onDragEnd = this.onDragEnd.bind(this);
    // this.addToDo = this.addToDo.bind(this);
    // this.togglePop = this.togglePop.bind(this);
    // this.handleTitleChange = this.handleTitleChange.bind(this);
    // this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
    // this.handleDateChange = this.handleDateChange.bind(this);
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

  // addToDo = () => {
  //   if (this.state.edit === false) {
  //     if (this.state.tempTitle !== '' && this.state.tempTitle !== null) {
  //       console.log(`${this.state.count}`)
  //       let r = this.state.count+1;
  //       let newState = this.state;
  //       let tempTitle = this.state.tempTitle;
  //       let tempDescription = this.state.tempDescription;
  //       let tempDate = this.state.tempDate;
  //       newState.todo = {
  //         ...newState.todo,
  //         [r]: {
  //           id: `${r}`,
  //           title: tempTitle,
  //           description: tempDescription,
  //           date: tempDate,
  //           complete: false

  //         }
  //       };
  //       newState.columns['col-1'].todoId = [...newState.columns['col-1'].todoId, `${r}`];
  //       newState.count = newState.count+1;
  //       newState.showPop = false;
  //       newState.tempDate = '';
  //       newState.tempDescription = '';
  //       newState.tempTitle = '';
  //       this.setState(newState);
  //     } else {
  //       alert("Please enter a title");
  //     }
  //   } else if (this.state.edit === true) {
  //     let newState = this.state;
  //     newState.todo[newState.currentEditId].title = newState.tempTitle;
  //     newState.todo[newState.currentEditId].description = newState.tempDescription;
  //     newState.todo[newState.currentEditId].date = newState.tempDate;
  //     newState.tempDate = '';
  //     newState.tempDescription = '';
  //     newState.tempTitle = '';
  //     newState.edit = false;
  //     newState.currentEditId = '';
  //     newState.showPop = false;
  //     this.setState(newState);
  //   }
  // }

  togglePop = () => {
    let test = !this.props.showPop
    this.props.togglePop({test});
  }

  // handleTitleChange = tempTitle => {
  //   this.setState({tempTitle});
  // }

  // handleDateChange = tempDate => {
  //   this.setState({tempDate});
  // }

  // handleDescriptionChange = tempDescription => {
  //   this.setState({tempDescription})
  // }


  render() {
    console.log(this.props)
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
                return <Column key={column.id} column={column} todos={todos} editCard={this.editCard} />;
              })}
          </DragDropContext>
        </div>
        {this.props.showPop ?
        <Popup
          // handleTitleChange={this.handleTitleChange}
          // handleDateChange={this.handleDateChange}
          // handleDescriptionChange={this.handleDescriptionChange}
          // tempTitle={this.state.tempTitle}
          // tempDate={this.state.tempDate}
          // tempDescription={this.state.tempDescription}
          // addToDo={this.addToDo}
          // editCard={this.editCard}
        /> : null}
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);



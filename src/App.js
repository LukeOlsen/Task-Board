import React, { Component } from 'react';
import Data from './Data';
import ToDo from './ToDo';
import Completed from './Completed';
import Working from './Working';
import {DragDropContext} from 'react-beautiful-dnd'; 
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <ToDo />
        <Working />
        <Completed />
      </div>
    );
  }
}

export default App;

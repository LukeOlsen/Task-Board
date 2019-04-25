import React, { Component } from 'react';
import LandingPage from './LandingPage';
import Main from './Main';
import { connect } from "react-redux"; 
import { BrowserRouter as Router, Route } from 'react-router-dom'
import '../App.css';

const mapStateToProps = state => {
  return { 
    
   };
};

const mapDispatchToProps = dispatch => {
  return {
  }
}


class App extends Component {


  render() {
    return (
      <div>
        <Route exact path='/Landing' component={LandingPage} />
        <Route exact path='/board/user' component={Main} />
        <Route exact path='/board/guest' component={Main} />
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);



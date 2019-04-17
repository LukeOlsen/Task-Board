import React, { Component } from 'react';
import LandingPage from './LandingPage';
import Main from './Main';
import { connect } from "react-redux"; 
import { BrowserRouter as Router, Route } from 'react-router-dom'
import axios from 'axios';
import '../App.css';

const mapStateToProps = state => {
  return { 
    showPop: state.projects[state.projects.active].data.showPop
   };
};

const mapDispatchToProps = dispatch => {
  return {
  }
}


class App extends Component {
  

  componentDidMount() {
    axios.get('/data/pull')
        .then(response => {
            this.setState(response.data);
        })
        .catch(function (error){
            console.log(error);
        })
  }


  render() {
    return (
      <div>
        <Route exact path='/Landing' component={LandingPage} />
        <Route path='/main' component={Main} />
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);



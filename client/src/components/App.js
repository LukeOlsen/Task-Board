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
<<<<<<< HEAD
        <Route exact path='/board/user' component={Main} />
        <Route exact path='/board/guest' component={Main} />
=======
        <Route exact path='/main' component={Main} />
>>>>>>> 172d6798361d1bab0e6917a2fa8ad6793821444b
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);



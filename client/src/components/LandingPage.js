import React from 'react';
import { setGuest } from '../actions/index';
import { connect } from "react-redux"; 


const mapStateToProps = state => {
    return {
    }
}

const mapDispatchToProps = dispatch => {
    return {
        setGuest: p => dispatch(setGuest(p))
    }
}

const LandingPage = ({setGuest}) => {

    return (
        <div>
            <h1>Welcome to the app!</h1>
            <a href="http://localhost:4000/auth/google"> Log in with google.</a>
        </div>
    )
}

export default connect(mapStateToProps, mapDispatchToProps)(LandingPage);
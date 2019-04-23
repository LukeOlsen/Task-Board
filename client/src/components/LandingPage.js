import React from 'react';
import { setGuest } from '../actions/index'


const mapStateToProps = state => {
    return {
    }
}

const mapDispatchToProps = dispatch => {
    return {
        setGuest: p => dispatch(setGuest(p))
    }
}

const LandingPage = () => {

    return (
        <div>
            <h1>Welcome to the app!</h1>
            <a href="http://localhost:4000/auth/google"> Log in with google.</a>
            <a onClick={setGuest} href="/board/guest">continue as guest</a>
        </div>
    )
}

export default connect(mapStateToProps, mapDispatchToProps)(LandingPage);
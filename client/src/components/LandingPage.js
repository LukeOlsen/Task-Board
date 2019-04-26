import React from 'react';
import { setGuest } from '../actions/index';
import { connect } from "react-redux"; 
import './LandingPage.css'
import Button from '@material-ui/core/Button';


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
        <div className="welcomeBackground">
            <div className="mainWelcomeCard">
                <div className="welcomeTextArea animated animatedFadeInUp fadeInUp">
                    <h1 className="welcomeTitle ">Welcome to a free task management board!</h1>
                </div>
                <div className="welcomeButtons animatedLonger animatedFadeInUp fadeInUp">
                    <div>
                       
                    </div>
                    <div>
                        <Button variant="contained" color="primary"><a href="http://localhost:4000/auth/google"> Log in with google</a></Button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default connect(mapStateToProps, mapDispatchToProps)(LandingPage);
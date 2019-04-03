import React, { Component } from 'react';
import { connect } from 'react-redux';
import { editTempDate, editTempDescription, editTempTitle, togglePopUp, addToDo, completeToDo } from '../actions/index';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

const mapStateToProps = state => {
    return {
        tempTitle: state.tempTitle,
        tempDate: state.tempDate,
        tempDescription: state.tempDescription,
        showPop: state.showPop
    }
}

const mapDispatchToProps = dispatch => {
    return {
        togglePop: pop => dispatch(togglePopUp(pop)),
        editTempTitle: title => dispatch(editTempTitle(title)),
        editTempDate: date => dispatch(editTempDate(date)),
        editTempDescription: desc => dispatch(editTempDescription(desc)),
        addToDo: todo => dispatch(addToDo(todo)),
        completeToDo: todo => dispatch(completeToDo(todo))
    }
}

class Popup extends Component {
    constructor(props) {
        super(props)

        this.togglePop = this.togglePop.bind(this);
    }

    togglePop = () => {
        let test = !this.props.showPop
        this.props.togglePop({test});
      }


    render() {
        console.log(this.props)
        return(
            <div className="popup">
                <div className="pop_inner">
                <div className="completeSection">
                    <i onClick={event => this.props.completeToDo()} className="material-icons">done</i>
                </div>
                <div className="popTop">
                    <i onClick={this.togglePop} className="material-icons clear">clear</i>
                </div>
                    <form className="infoForm">
                        <TextField 
                            type="text"
                            className="tempTitle"
                            value={this.props.tempTitle}
                            onChange={event => this.props.editTempTitle(event.target.value)}
                        />
                        <TextField
                            type="text"
                            className="tempDescription"
                            value={this.props.tempDescription}
                            onChange={event => this.props.editTempDescription(event.target.value)}
                        />
                        <TextField
                            type="date"
                            className="tempDate"
                            value={this.props.tempDate}
                            onChange={event => this.props.editTempDate(event.target.value)}
                        />
                        <Button variant="contained" color="primary" onClick={event => this.props.addToDo()}>done</Button>
                    </form>
                </div>
            </div>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Popup);
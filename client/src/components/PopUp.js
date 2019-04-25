import React, { Component } from 'react';
import { connect } from 'react-redux';
import { editTempDate, editTempDescription, editTempTitle, togglePopUp } from '../actions/index';
import { updateAddToDo, updateCompleteTodo } from '../actions/actionsAPI';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

const mapStateToProps = state => {
    return {
        tempTitle: state.boardReducer.projects[state.boardReducer.projects.active].data.tempTitle,
        tempDate: state.boardReducer.projects[state.boardReducer.projects.active].data.tempDate,
        tempDescription: state.boardReducer.projects[state.boardReducer.projects.active].data.tempDescription,
        showPop: state.boardReducer.projects[state.boardReducer.projects.active].data.showPop
    }
}

const mapDispatchToProps = dispatch => {
    return {
        togglePop: pop => dispatch(togglePopUp(pop)),
        editTempTitle: title => dispatch(editTempTitle(title)),
        editTempDate: date => dispatch(editTempDate(date)),
        editTempDescription: desc => dispatch(editTempDescription(desc)),
        updateAddToDo: todo => dispatch(updateAddToDo(todo)),
        updateCompleteTodo: todo => dispatch(updateCompleteTodo(todo))
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
        return(
            <div className="popup">
                <div className="pop_inner">
                <div className="completeSection">
                    <i onClick={event => this.props.updateCompleteTodo()} className="material-icons">done</i>
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
                        <Button variant="contained" color="primary" onClick={event => this.props.updateAddToDo()}>done</Button>
                    </form>
                </div>
            </div>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Popup);
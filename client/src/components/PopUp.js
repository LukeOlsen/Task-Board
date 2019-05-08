import React, { Component } from 'react';
import { connect } from 'react-redux';
import { editTempDate, editTempDescription, editTempTitle, togglePopUp } from '../actions/index';
import { updateAddToDo, updateCompleteTodo, updateRemoveTodo } from '../actions/actionsAPI';
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
        updateCompleteTodo: todo => dispatch(updateCompleteTodo(todo)),
        updateRemoveTodo: todo => dispatch(updateRemoveTodo(todo))
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
        console.log(this.props.showPop)
        return(
            <div className="popup">
                <div className="pop_inner">
                    <div>
                        <div className="popTop">
                            <i onClick={this.togglePop} className="material-icons clear">clear</i>
                        </div>
                    </div>
                    <div className="inputFieldArea">
                        <form className="infoForm">
                            <div className="textArea">
                                <TextField 
                                    type="text"
                                    className="tempTitle"
                                    value={this.props.tempTitle}
                                    onChange={event => this.props.editTempTitle(event.target.value)}
                                />
                            </div>
                            <div className="textArea">
                                <TextField
                                    type="date"
                                    className="tempDate"
                                    value={this.props.tempDate}
                                    onChange={event => this.props.editTempDate(event.target.value)}
                                />
                            </div>
                            <div className="textArea">
                                <TextField
                                    type="text"
                                    className="tempDescription"
                                    label="Notes"
                                    multiline
                                    variant="outlined"
                                    rows="4"
                                    value={this.props.tempDescription}
                                    onChange={event => this.props.editTempDescription(event.target.value)}
                                />
                            </div>
                            <div>
                                <Button variant="contained" color="secondary" onClick={event => this.props.updateRemoveTodo()}>Delete</Button>
                                <Button variant="contained" color="primary" onClick={event => this.props.updateAddToDo()}>done</Button>
                                <Button onClick={event => this.props.updateCompleteTodo()} variant="contained" className="completeSection">
                                    <i className="material-icons">done</i>
                                </Button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Popup);
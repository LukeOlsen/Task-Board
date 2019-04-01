import React from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

const Popup = (props) => {
    return(
        <div className="popup">
            <div className="pop_inner">
            <div className="popTop">
                <i onClick={props.toggle} className="material-icons clear">clear</i>
            </div>
                <form className="infoForm">
                    <TextField 
                        type="text"
                        className="tempTitle"
                        value={props.tempTitle}
                        onChange={event => props.handleTitleChange(event.target.value)}
                    />
                    <TextField
                        type="text"
                        className="tempDescription"
                        value={props.tempDescription}
                        onChange={event => props.handleDescriptionChange(event.target.value)}
                    />
                    <TextField
                        type="date"
                        className="tempDate"
                        value={props.tempDate}
                        onChange={event => props.handleDateChange(event.target.value)}
                    />
                    <Button variant="contained" color="primary" onClick={props.addToDo}>done</Button>
                </form>
            </div>
        </div>
    )
}

export default Popup;
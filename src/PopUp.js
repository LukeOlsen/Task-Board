import React from 'react';

const Popup = (props) => {
    return(
        <div className="popup">
            <div className="pop_inner">
                <input 
                    type="text"
                    className="tempTitle"
                    //placeholder={props.tempTitle}
                    value={props.tempTitle}
                    onChange={event => props.handleTitleChange(event.target.value)}
                />
                <input
                    type="text"
                    className="tempDescription"
                    //placeholder={props.tempDescription}
                    value={props.tempDescription}
                    onChange={event => props.handleDescriptionChange(event.target.value)}
                />
                <input
                    type="date"
                    className="tempDate"
                    value={props.tempDescription}
                    onChange={event => props.handleDateChange(event.target.value)}
                />
                <p>{props.tempTitle}...</p>
                <button onClick={props.addToDo}>done</button>
            </div>
        </div>
    )
}

export default Popup;
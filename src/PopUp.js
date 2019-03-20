import React from 'react';

const Popup = (props) => {
    return(
        <div className="popup">
            <div className="pop_inner">
                <input 
                    type="text"
                    className="tempTitle"
                    placeholder="Give me a title"
                    value={props.tempTitle}
                    onChange={event => props.handleTitleChange(event.target.value)}
                />
                <input
                    type="text"
                    className="tempDescription"
                    placeholder="Give me a description"
                    value={props.tempDescription}
                    onChange={event => props.handleDescriptionChange(event.target.value)}
                />
                <input
                    type="date"
                    className="tempDate"
                    value={props.tempDescription}
                    onChange={event => props.handleDateChange(event.target.value)}
                />
                <button onClick={props.addToDo}>done</button>
            </div>
        </div>
    )
}

export default Popup;
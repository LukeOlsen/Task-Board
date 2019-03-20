import React from 'react';

const Popup = (props) => {
    return(
        <div className="popup">
            <div className="pop_inner">
                <h1>test</h1>
                <button onClick={props.toggle}>done</button>
            </div>
        </div>
    )
}

export default Popup;
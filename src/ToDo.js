import React from 'react';
import {Draggable} from 'react-beautiful-dnd';

const ToDo = (props) => {
    console.log(props.todo.id)
    console.log("test")
    return (
        <div>
            <Draggable
                draggableId={props.todo.title}
                index={props.index}
            >
                {provided =>(
                    <div className="toDoCard"
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    ref={provided.innerRef}
                    >
                        {props.todo.title}
                    </div>
                )}
            </Draggable>
        </div>
    )
}

export default ToDo;
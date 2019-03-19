import React from 'react';
import {Draggable} from 'react-beautiful-dnd';

const ToDo = (props) => {

    return (
        <Draggable
            draggableId={props.todo.id}
            index={props.index}
        >
            {provided =>(
                <div className="Container"
                  {...provided.draggableProps}
                  {...provided.dragHandleProps}
                  innerRef={provided.innerRef}
                >
                    {props.todo.title}
                </div>
            )}
        </Draggable>
    )
}

export default ToDo;
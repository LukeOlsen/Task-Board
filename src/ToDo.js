import React from 'react';
import {Draggable} from 'react-beautiful-dnd';

const ToDo = (props) => {

    alert = (e) => {
        e.preventDefault();
        console.log(props.todo.id)
    }

    return (
        <div>
            <Draggable
                draggableId={props.todo.id}
                index={props.index}
            >
                {provided =>(
                    <div className="toDoCard"
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    ref={provided.innerRef}
                    onClick={() => props.editCard(props.todo.id)}
                    >
                        {props.todo.title}
                    </div>
                )}
            </Draggable>
        </div>
    )
}

export default ToDo;
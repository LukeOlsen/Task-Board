import React from 'react';
import {Draggable} from 'react-beautiful-dnd';

const ToDo = (props) => {


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
                        <p>{props.todo.title}</p>
                        <i class="material-icons">done</i>
                    </div>
                )}
            </Draggable>
        </div>
    )
}

export default ToDo;
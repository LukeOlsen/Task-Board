import React from 'react';
import {Droppable} from 'react-beautiful-dnd';
import ToDo from './ToDo';

const Column = (props) => {
    return (
        <div className="to-Do-Container">
        <Droppable droppableId={props.column.id}>
            {(provided, snapshot) => (
                <div
                    className="toDo"
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                >
                     {props.todos.map((todo, index) => (
                        <ToDo key={todo.id} todo={todo} index={index} />
                    ))} 
                    {provided.placeholder}
                </div>
            )}
        </Droppable>
        </div>
    )
}

export default Column;

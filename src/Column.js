import React from 'react';
import {Droppable} from 'react-beautiful-dnd';
import ToDo from './ToDo';

const Column = (props) => {
    console.log(props)
    let test = props.column.id
    console.log(test)
    return (
        <Droppable droppableId={props.column.id}>
            {(provided, snapshot) => (
                <div
                    className="to-Do-Container"
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
    )
}

export default Column;

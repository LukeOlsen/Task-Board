import React from 'react';
import {Droppable} from 'react-beautiful-dnd';
import ToDo from 'ToDo';

const Column = (props) => {

    return (
        <Droppable droppableId={this.props.column.id}>
            {(provided) => {
                <div
                    className="to-Do-Container"
                    innerRef={provided.innerRef}
                    {...provided.droppableProps}
                >
                    {this.props.todo.map((todo, index) => (
                        <ToDo key={todo.id} todo={todo} index={index} />
                    ))}
                    {provided.placeholder}
                </div>
            }}
        </Droppable>
    )
}

export default Column;
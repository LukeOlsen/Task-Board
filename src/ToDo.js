import React from 'react';
import {Draggable} from 'react-beautiful-dnd';

const ToDo = (props) => {

    return (
        <Draggable
            draggableId={this.props.todo.id}
            index={this.props.index}
        >
            {provided =>(
                <div className="Container"
                  {...provided.draggableProps}
                  {...provided.dragHandleProps}
                  innerRef={provided.innerRef}
                >
                    {this.props.todo.title}
                </div>
            )}
        </Draggable>
    )
}

export default ToDo;
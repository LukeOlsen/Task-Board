import React from 'react';
import { connect } from 'react-redux';
import { editCard } from '../actions/index';
import {Droppable, Draggable} from 'react-beautiful-dnd';
import ToDo from './ToDo';

const mapDispatchToProps = dispatch => {
    return {
        editCard: el => dispatch(editCard(el))
    }
}

const Column = (props) => {
    return (
        <Draggable draggableId={props.column.id} index={props.index}>
            {(provided) => (
            <div 
                className="to-Do-Container"
                {...provided.draggableProps}
                {...provided.dragHandleProps}
                ref={provided.innerRef}
            >
            <h2 {...provided.dragHandleProps}>{props.column.title}</h2>
            <Droppable droppableId={props.column.id} type="task">
                {(provided, snapshot) => (
                    <div
                        className="toDoList"
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                    >
                        {props.todos.map((todo, index) => (
                            <ToDo key={todo.id} todo={todo} index={index} editCard={props.editCard}/>
                        ))} 
                        {provided.placeholder}
                    </div>
                )}
            </Droppable>
            </div>
            )}
        </Draggable>
    )
}

export default connect(mapDispatchToProps)(Column);

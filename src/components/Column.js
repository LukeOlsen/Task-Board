import React from 'react';
import { connect } from 'react-redux';
import { editCard } from '../actions/index';
import {Droppable} from 'react-beautiful-dnd';
import ToDo from './ToDo';

const mapDispatchToProps = dispatch => {
    return {
        editCard: el => dispatch(editCard(el))
    }
}

const Column = (props) => {
    return (
        <div className="to-Do-Container">
        <h1>{props.column.title}</h1>
        <Droppable droppableId={props.column.id}>
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
    )
}

export default connect(mapDispatchToProps)(Column);

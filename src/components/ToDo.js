import React from 'react';
import { connect } from 'react-redux';
import { editCard } from '../actions/index';
import {Draggable} from 'react-beautiful-dnd';

const mapStateToProps = state => {
    return {
        showPop: state.showPop,
        currentEditId: state.currentEditId
    }
}

const mapDispatchToProps = dispatch => {
    return {
        editCard: card => dispatch(editCard(card))
    }
}

const ToDo = (props) => {
    console.log(props.todo.complete)
    return (
        <div>
            <Draggable
                draggableId={props.todo.id}
                index={props.index}
            >
                {provided =>(
                    props.todo.complete ?
                        <div className="toDoCard complete"
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        ref={provided.innerRef}
                        onClick={() => props.editCard(props.todo)}
                        >
                            <p>{props.todo.title}</p>
                        </div>
                    : 
                        <div className="toDoCard"
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        ref={provided.innerRef}
                        onClick={() => props.editCard(props.todo)}
                        >
                            <p>{props.todo.title}</p>
                        </div>
                )}
            </Draggable>
        </div>
    )
}

export default connect(mapStateToProps, mapDispatchToProps)(ToDo);
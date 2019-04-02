import React from 'react';
import { connect } from 'react-redux';
import { editCard } from '../actions/index';
import {Draggable} from 'react-beautiful-dnd';

const mapStateToProps = state => {
    return {

    }
}

const mapDispatchToProps = dispatch => {
    return {
        editCard: card => dispatch(editCard(card))
    }
}

const ToDo = (props) => {
    console.log(props)

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
                    onClick={() => props.editCard(props.todo)}
                    >
                        <p>{props.todo.title}</p>
                        <i class="material-icons">done</i>
                    </div>
                )}
            </Draggable>
        </div>
    )
}

export default connect(mapStateToProps, mapDispatchToProps)(ToDo);
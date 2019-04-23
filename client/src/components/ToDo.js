import React from 'react';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import CardContent from '@material-ui/core/CardContent';
import { connect } from 'react-redux';
import { editCard } from '../actions/index';
import {Draggable} from 'react-beautiful-dnd';

const mapStateToProps = state => {
    return {
        showPop: state.projects[state.projects.active].data.showPop,
        currentEditId: state.projects[state.projects.active].data.currentEditId
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
                        <div className=""
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        ref={provided.innerRef}
                        onClick={() => props.editCard(props.todo)}
                        >
                            <Card className="toDoCard complete">
                                <CardContent>
                                    <Typography>{props.todo.title}</Typography>
                                </CardContent>
                            </Card>
                        </div>
                    : 
                        <div className=""
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        ref={provided.innerRef}
                        onClick={() => props.editCard(props.todo)}
                        >
                            <Card className="toDoCard">
                                <CardContent>
                                    <Typography>{props.todo.title}</Typography>
                                </CardContent>
                            </Card>
                        </div>
                )}
            </Draggable>
        </div>
    )
}

export default connect(mapStateToProps, mapDispatchToProps)(ToDo);
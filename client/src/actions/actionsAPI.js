import { fetchBoardBegin, addProject, editProjectTitle, completeToDo, deleteTodo } from './index';
import { fetchBoardSuccess } from './index';
import { addToDo } from './index';
import { moveToDo } from './index';
import { updateColumn } from './index';
import Axios from 'axios';

function sendBoardUpdateToDB(payload) {
    Axios.post('http://localhost:4000/data/update', payload)
    .then(res => {
        console.log(res);
    })
    .catch(error => {
        console.log(error.response)
    })
}

export function fetchBoard() {
    return dispatch => {
        dispatch(fetchBoardBegin())
        return Axios.get('/data/pull')
          .then(res => res)
          .then(json => {
              dispatch(fetchBoardSuccess(json.data))
              return json.data
          })
    }
}

export function updateAddToDo() {
    return (dispatch, getState) => {
        dispatch(addToDo())
        console.log("UPDATE ADD:")
        let tempState = getState()
        console.log(tempState.boardReducer)
        sendBoardUpdateToDB(tempState.boardReducer)
    }
}

export function updateMoveToDo(payload) {
    return (dispatch, getState) => {
        dispatch(moveToDo(payload))
        console.log("UPDATE MOVE:")
        let tempState = getState()
        console.log(tempState.boardReducer)
        sendBoardUpdateToDB(tempState.boardReducer)
    }
}

export function updateAddProject() {
    return (dispatch, getState) => {
        dispatch(addProject())
        console.log("UPDATE ADD PROJECT:")
        let tempState = getState()
        console.log(tempState.boardReducer)
        sendBoardUpdateToDB(tempState.boardReducer)
    }
}

export function updateEditProjectTitle() {
    return (dispatch, getState) => {
        dispatch(editProjectTitle())
        let tempState = getState()
        sendBoardUpdateToDB(tempState.boardReducer)
    }
}

export function updateCompleteTodo() {
    return (dispatch, getState) => {
        dispatch(completeToDo())
        let tempState = getState()
        sendBoardUpdateToDB(tempState.boardReducer)
    }
}

export function updateRemoveTodo() {
    return (dispatch, getState) => {
        dispatch(deleteTodo());
        let tempState = getState();
        sendBoardUpdateToDB(tempState.boardReducer)
    }
}

export function updateMoveColumn(payload) {
    return (dispatch, getState) => {
        dispatch(updateColumn(payload))
        let tempState = getState()
        sendBoardUpdateToDB(tempState.boardReducer)
    }
}
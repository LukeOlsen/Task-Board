import { fetchBoardBegin } from './index';
import { fetchBoardSuccess } from './index';
import { addToDo } from './index';
import Axios from 'axios';

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
        Axios.post('http://localhost:4000/data/update', tempState.boardReducer)
            .then(res => {
                console.log(res);
            })
            .catch(error => {
                console.log(error.response)
            })
    }
}
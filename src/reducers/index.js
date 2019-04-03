import { EDIT_CARD, ADD_TODO, EDIT_TEMP_TITLE, EDIT_TEMP_DATE, EDIT_TEMP_DESC, COMPLETE_TODO } from "../constants/action-types";
import { TOGGLE_POPUP } from "../constants/action-types";
import { MOVE_TODO } from "../constants/action-types";
import Data from '../Data';


const initialState = Data;


function rootReducer(state = initialState, action) {
  console.log(state)
   if (action.type === TOGGLE_POPUP) {
      console.log(action.payload.test)
      return Object.assign({}, state, {
        showPop: action.payload.test,
        tempTitle: '',
        tempDate: '',
        tempDescription: ''
      });
  } else if (action.type === MOVE_TODO) {
      console.log(action.payload)
      if (action.payload.begin === action.payload.end){
        const newToDoIds = Array.from(action.payload.begin.todoId);
        newToDoIds.splice(action.payload.source.index, 1);
        newToDoIds.splice(action.payload.destination.index, 0, action.payload.draggableId);
        const newColumn = {
          ...action.payload.begin,
          todoId: newToDoIds,
        };
        console.log(newColumn)
        return Object.assign({}, state,  {
          ...state,
          columns: {
            ...state.columns,
            [newColumn.id]: newColumn,
          },
        });
        }
        if (action.payload.begin !== action.payload.end ) {
          const beginToDoIds = Array.from(action.payload.begin.todoId);
          beginToDoIds.splice(action.payload.source.index, 1);
          const newBegin = {
            ...action.payload.begin,
            todoId: beginToDoIds
          }
          console.log(newBegin)
          const endToDoIds = Array.from(action.payload.end.todoId);
          endToDoIds.splice(action.payload.destination.index, 0, action.payload.draggableId);
          const newEnd = {
            ...action.payload.end,
            todoId: endToDoIds
          }
          return Object.assign({}, state, {
            ...state,
            columns: {
              ...state.columns,
              [newBegin.id]: newBegin,
              [newEnd.id]: newEnd,
            }
          })
        }
  } else if (action.type === EDIT_CARD) {
      console.log(action.payload)
      return Object.assign({}, state, {
          ...state,
          edit: true,
          tempTitle: action.payload.title,
          tempDescription: action.payload.description,
          tempDate: action.payload.tempDate,
          currentEditId: action.payload.id,
          showPop: true
      })
  } else if (action.type === ADD_TODO) {
    console.log(state)
    if (state.edit === false) {
            if (state.tempTitle !== '' && state.tempTitle !== null) {
              console.log(`${state.count}`)
              let r = state.count+1;

              return Object.assign({}, state, {
                  ...state,
                  todo: {
                      ...state.todo,
                      [r]: {
                          id: `${r}`,
                          title: state.tempTitle,
                          date: state.tempDate,
                          description: state.tempDescription,
                          complete: false
                      }
                  },
                  columns: {
                      ...state.columns,
                      'col-1': {
                          ...state.columns['col-1'],
                          todoId: [...state.columns['col-1'].todoId, `${r}`]
                      }
                  },
                  count: state.count+1,
                  showPop: false,
                  tempDate: '',
                  tempTitle: '',
                  tempDescription: ''
              })
            } else {
              alert("Please enter a title");
            }
          } else if (state.edit === true) {
            let newState = state;
            newState.todo[newState.currentEditId].title = newState.tempTitle;
            newState.todo[newState.currentEditId].description = newState.tempDescription;
            newState.todo[newState.currentEditId].date = newState.tempDate;
            newState.tempDate = '';
            newState.tempDescription = '';
            newState.tempTitle = '';
            newState.edit = false;
            newState.currentEditId = '';
            newState.showPop = false;
            return Object.assign({}, newState)
          }
  } else if (action.type === EDIT_TEMP_TITLE) {
    return Object.assign({}, state, {
      ...state,
      tempTitle: action.payload
    })
  } else if (action.type === EDIT_TEMP_DATE) {
    return Object.assign({}, state, {
      ...state, 
      tempDate: action.payload    
    })
  } else if (action.type === EDIT_TEMP_DESC) {
    return Object.assign({}, state, {
      ...state,
      tempDescription: action.payload
    })
  } else if (action.type === COMPLETE_TODO) {
      let newState = state;
      newState.todo[state.currentEditId].complete = true;
      console.log(newState);
      return newState;
  }
  return state;
}


export default rootReducer;
import { ADD_ARTICLE, EDIT_CARD, ADD_TODO } from "../constants/action-types";
import { TOGGLE_POPUP } from "../constants/action-types";
import { MOVE_TODO } from "../constants/action-types";
import Data from '../Data';


const initialState = Data;


function rootReducer(state = initialState, action) {
  if (action.type === ADD_ARTICLE) {
    return Object.assign({}, state, {
      articles: state.articles.concat(action.payload)
    });
  } else if (action.type === TOGGLE_POPUP) {
      console.log(action.payload)
      return Object.assign({}, state, {
        showPop: action.payload
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
        return {
          ...state,
          columns: {
            ...state.columns,
            [newColumn.id]: newColumn,
          },
        };
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
          return {
            ...state,
            columns: {
              ...state.columns,
              [newBegin.id]: newBegin,
              [newEnd.id]: newEnd,
            }
          }
        }
  } else if (action.type === EDIT_CARD) {
      console.log(action.payload)
      return {
          ...state,
          edit: true,
          tempTitle: action.payload.title,
          tempDescription: action.payload.description,
          tempDate: action.payload.tempDate,
          currentEditId: action.payload.id,
          showPop: true
      }
  } else if (action.type === ADD_TODO) {
      
  }
  return state;
}


export default rootReducer;
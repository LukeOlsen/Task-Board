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
    if (this.state.edit === false) {
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
            //   let newState = this.state;
            //   let tempTitle = this.state.tempTitle;
            //   let tempDescription = this.state.tempDescription;
            //   let tempDate = this.state.tempDate;
            //   newState.todo = {
            //     ...newState.todo,
            //     [r]: {
            //       id: `${r}`,
            //       title: tempTitle,
            //       description: tempDescription,
            //       date: tempDate,
            //       complete: false
      
            //     }
            //   };
            //   newState.columns['col-1'].todoId = [...newState.columns['col-1'].todoId, `${r}`];
            //   newState.count = newState.count+1;
            //   newState.showPop = false;
            //   newState.tempDate = '';
            //   newState.tempDescription = '';
            //   newState.tempTitle = '';
            //   this.setState(newState);
            } else {
              alert("Please enter a title");
            }
          } else if (this.state.edit === true) {
              return Object.assign({}, state, {
                  ...state,
                  todo[currentEditId].title = tempTitle
              })
            // let newState = this.state;
            // newState.todo[newState.currentEditId].title = newState.tempTitle;
            // newState.todo[newState.currentEditId].description = newState.tempDescription;
            // newState.todo[newState.currentEditId].date = newState.tempDate;
            // newState.tempDate = '';
            // newState.tempDescription = '';
            // newState.tempTitle = '';
            // newState.edit = false;
            // newState.currentEditId = '';
            // newState.showPop = false;
            // this.setState(newState);
          }
  }
  return state;
}


export default rootReducer;
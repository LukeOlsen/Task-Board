import { EDIT_CARD, ADD_TODO, EDIT_TEMP_TITLE, EDIT_TEMP_DATE, EDIT_TEMP_DESC, COMPLETE_TODO } from "../constants/action-types";
import { TOGGLE_POPUP } from "../constants/action-types";
import { MOVE_TODO } from "../constants/action-types";
import Data from '../Data';


const initialState = Data;


function rootReducer(state = initialState, action) {
    console.log(state)
   if (action.type === TOGGLE_POPUP) {
      console.log(action.payload.test)
      let temp = state.projects.active;
      return Object.assign({}, state, {
        ...state, 
        projects: {
            ...state.projects,
            [temp]: {
                ...state.projects[temp],
                data: {
                    ...state.projects[temp].data, 
                    showPop: action.payload.test,
                    tempTitle: '',
                    tempDate: '',
                    tempDescription: ''
                }
            }
        }
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
            projects: {
                ...state.projects,
                [state.projects.active]: {
                    ...state.projects[state.projects.active],
                    data: {
                        ...state.projects[state.projects.active].data, 
                        columns: {
                            ...state.projects[state.projects.active].data.columns,
                            [newColumn.id]: newColumn,
                        }
                    }
                }
            }
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
            projects: {
                ...state.projects,
                [state.projects.active]: {
                    ...state.projects[state.projects.active],
                    data: {
                        ...state.projects[state.projects.active].data, 
                        columns: {
                            ...state.projects[state.projects.active].data.columns,
                            [newBegin.id]: newBegin,
                            [newEnd.id]: newEnd
                        }
                    }
                }
            }
          })
        }
  } else if (action.type === EDIT_CARD) {
      console.log(action.payload)
      return Object.assign({}, state, {
        ...state, 
        projects: {
            ...state.projects,
            [state.projects.active]: {
                ...state.projects[state.projects.active],
                data: {
                    ...state.projects[state.projects.active].data, 
                    edit: true,
                    tempTitle: action.payload.title,
                    tempDescription: action.payload.description,
                    tempDate: action.payload.date,
                    currentEditId: action.payload.id,
                    showPop: true
                }
            }
        }
      })
  } else if (action.type === ADD_TODO) {
    console.log(state)
    if (state.projects[state.projects.active].data.edit === false) {
            if (state.tempTitle !== '' && state.tempTitle !== null) {
              console.log(`${state.count}`)
              let r = state.projects[state.projects.active].data.count+1;
              console.log(r)
              console.log(r)
              console.log(r)

              return Object.assign({}, state, {
                ...state, 
                projects: {
                    ...state.projects,
                    [state.projects.active]: {
                        ...state.projects[state.projects.active],
                        data: {
                            ...state.projects[state.projects.active].data, 
                            todo: {
                              ...state.projects[state.projects.active].data.todo,
                              [r]: {
                                  id: `${r}`,
                                  title: state.projects[state.projects.active].data.tempTitle,
                                  date: state.projects[state.projects.active].data.tempDate,
                                  description: state.projects[state.projects.active].data.tempDescription,
                                  complete: false
                              }
                          },
                          columns: {
                              ...state.projects[state.projects.active].data.columns,
                              ['col-1']: {
                                  ...state.projects[state.projects.active].data.columns['col-1'],
                                  todoId: [...state.projects[state.projects.active].data.columns['col-1'].todoId, `${r}`]
                              }
                          },
                          count: state.projects[state.projects.active].data.count+1,
                          showPop: false,
                          tempDate: '',
                          tempTitle: '',
                          tempDescription: ''
                        }
                    }
                }
              })
            } else {
              alert("Please enter a title");
            }
          } else if (state.projects[state.projects.active].data.edit === true) {
            let newState = state;
            console.log(newState.projects[state.projects.active].data)
            console.log(newState.projects[state.projects.active].data.todo)
            newState.projects[state.projects.active].data.todo[newState.projects[state.projects.active].data.currentEditId].title = newState.projects[state.projects.active].data.tempTitle;
            newState.projects[state.projects.active].data.todo[newState.projects[state.projects.active].data.currentEditId].description = newState.projects[state.projects.active].data.tempDescription;
            newState.projects[state.projects.active].data.todo[newState.projects[state.projects.active].data.currentEditId].date = newState.projects[state.projects.active].data.tempDate;
            newState.projects[state.projects.active].data.tempDate = '';
            newState.projects[state.projects.active].data.tempDescription = '';
            newState.projects[state.projects.active].data.tempTitle = '';
            newState.projects[state.projects.active].data.edit = false;
            newState.projects[state.projects.active].data.currentEditId = '';
            newState.projects[state.projects.active].data.showPop = false;
            return Object.assign({}, newState)
          }
  } else if (action.type === EDIT_TEMP_TITLE) {
    return Object.assign({}, state, {
      ...state,
      projects: {
        ...state.projects,
        [state.projects.active]: {
            ...state.projects[state.projects.active],
            data: {
                ...state.projects[state.projects.active].data, 
                tempTitle: action.payload
            }
        }
      }
    })
  } else if (action.type === EDIT_TEMP_DATE) {
    return Object.assign({}, state, {
      ...state,
      projects: {
        ...state.projects,
        [state.projects.active]: {
            ...state.projects[state.projects.active],
            data: {
                ...state.projects[state.projects.active].data,
                tempDate: action.payload
            }
        }
      }   
    })
  } else if (action.type === EDIT_TEMP_DESC) {
    return Object.assign({}, state, {
      ...state,
      projects: {
        ...state.projects,
        [state.projects.active]: {
            ...state.projects[state.projects.active],
            data: {
                ...state.projects[state.projects.active].data,
                tempDescription: action.payload
            }
        }
      }
    })
  } else if (action.type === COMPLETE_TODO) {
      let newState = state;
      newState.projects[state.projects.active].data.todo[state.projects[state.projects.active].data.currentEditId].complete = true;
      console.log(newState);
      return newState;
  }
  return state;
}


export default rootReducer;
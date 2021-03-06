import { EDIT_CARD, ADD_TODO, EDIT_TEMP_TITLE, EDIT_TEMP_DATE, EDIT_TEMP_DESC, COMPLETE_TODO, SET_PROJECT, ADD_PROJECT, EDIT_PROJ_TITLE, EDIT_PROJ_TEMP_TITLE, FETCH_BOARD_BEGIN, FETCH_BOARD_SUCCESS, DELETE_TODO, UPDATE_COLUMN } from "../constants/action-types";
import { TOGGLE_POPUP } from "../constants/action-types";
import { MOVE_TODO } from "../constants/action-types";
import { ADD_COLUMN } from "../constants/action-types";
import Data from '../Data';


export default function boardReducer(state = Data, action) {
   if (action.type === TOGGLE_POPUP) {
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
      if (action.payload.begin === action.payload.end){
        const newToDoIds = Array.from(action.payload.begin.todoId);
        newToDoIds.splice(action.payload.source.index, 1);
        newToDoIds.splice(action.payload.destination.index, 0, action.payload.draggableId);
        const newColumn = {
          ...action.payload.begin,
          todoId: newToDoIds,
        };
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
    if (state.projects[state.projects.active].data.edit === false) {
            if (state.tempTitle !== '' && state.tempTitle !== null) {
              let r = state.projects[state.projects.active].data.count+1;
              let newState =  Object.assign({}, state, {
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

              return newState  
            } else {
              alert("Please enter a title");
            }
          } else if (state.projects[state.projects.active].data.edit === true) {
            let newState = state;
            let activeProj = state.projects.active
            newState.projects[activeProj].data.todo[newState.projects[activeProj].data.currentEditId].title = newState.projects[activeProj].data.tempTitle;
            newState.projects[activeProj].data.todo[newState.projects[activeProj].data.currentEditId].description = newState.projects[activeProj].data.tempDescription;
            newState.projects[activeProj].data.todo[newState.projects[activeProj].data.currentEditId].date = newState.projects[activeProj].data.tempDate;
            newState.projects[activeProj].data.tempDate = '';
            newState.projects[activeProj].data.tempDescription = '';
            newState.projects[activeProj].data.tempTitle = '';
            newState.projects[activeProj].data.edit = false;
            newState.projects[activeProj].data.currentEditId = '';
            newState.projects[activeProj].data.showPop = false; 
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
      newState.projects[state.projects.active].data.todo.showPop = false;
      return Object.assign({}, newState);
  } else if (action.type === SET_PROJECT) {
      return Object.assign({}, state, {
        ...state,
        projects: {
            ...state.projects,
            active: action.payload
        }
      });
   } else if (action.type === ADD_PROJECT) {
       let temp = state.projects.numberOfProjects+1;
        return Object.assign({}, state, {
            ...state,
            projects: {
                ...state.projects,
                numberOfProjects: temp,
                [temp]: {
                    id: `${temp}`,
                    title: 'Temp Title',
                    data: {
                      todo: {
                        
                    },
                    columns: {
                        'col-1': {
                            id: 'col-1',
                            title: 'To Do',
                            todoId: []
                        },
                        'col-2': {
                            id: 'col-2',
                            title: 'In Progress',
                            todoId: []
                        },
                        'col-3': {
                            id: 'col-3',
                            title: 'Awaiting Approval',
                            todoId: []
                        },
                        'col-4': {
                            id: 'col-4',
                            title: 'Complete',
                            todoId: []
                        }
                    },
                    columnsort: ['col-1', 'col-2', 'col-3', 'col-4'],
                    count: 0,
                    showPop: false,
                    edit: false,
                    currentEditId: '',
                    tempTitle: '',
                    tempDate: '',
                    tempDescription: ''
                    }
                }
            }
        })
   } else if (action.type === EDIT_PROJ_TITLE) {
     return Object.assign({}, state, {
       ...state, 
       projects: {
         ...state.projects,
         [state.projects.active]: {
           ...state.projects[state.projects.active],
           title: state.projects[state.projects.active].tempProjTitle
         }
       }
     })
   } else if (action.type === EDIT_PROJ_TEMP_TITLE) {
     return Object.assign({}, state, {
      ...state, 
      projects: {
        ...state.projects,
        [state.projects.active]: {
          ...state.projects[state.projects.active],
          tempProjTitle: action.payload
        }
      }
     })
   } else if (action.type === FETCH_BOARD_BEGIN) {
       return Object.assign({}, state, {
           ...state, 
           loading: true
       })
   } else if (action.type === FETCH_BOARD_SUCCESS) {
        return action.payload
   } else if (action.type === DELETE_TODO) {
       let newState = state;
       console.log("HERE:")
       console.log(newState.projects[newState.projects.active].data)
       let currentTodo = newState.projects[newState.projects.active].data.currentEditId;
       let currentProject = newState.projects.active;
       console.log(newState.projects[currentProject].data.todo)
       delete newState.projects[currentProject].data.todo[currentTodo]
       for (var cols in newState.projects[currentProject].data.columns) {
            for (var i = 0; i < newState.projects[currentProject].data.columns[cols].todoId.length; i++) {
                if (currentTodo === newState.projects[currentProject].data.columns[cols].todoId[i]) {
                    newState.projects[currentProject].data.columns[cols].todoId.splice(i, 1);
                }
            }
       }
       newState.projects[currentProject].data.showPop = false;
       newState.projects[currentProject].data.edit = false;
       newState.projects[currentProject].data.currentEditId = '';
       newState.projects[currentProject].data.tempTitle = '';
       newState.projects[currentProject].data.tempDate = '';
       newState.projects[currentProject].data.tempDescription = '';
       console.log("FINAL DELETE:")
       console.log(newState)
       return Object.assign({}, newState) 
   } else if (action.type === UPDATE_COLUMN) {
     let newState = state;
     newState.projects[newState.projects.active].data.columnsort = action.payload;
     console.log(newState);
     return Object.assign({}, newState)
   } else if (action.type === ADD_COLUMN) {
     let col = 'col-';
     let currentProject = state.projects.active;
     let currentCol = state.projects[currentProject].data.columnCount;
     let newCol = col+currentCol;
     currentCol = currentCol + 1;
     let colName = col+currentCol;
     let newColArray = state.projects[currentProject].data.columnsort;
     newColArray.push(colName)
     return Object.assign({}, state, {
       ...state,
       projects: {
         ...state.projects,
         [state.projects.active]: {
           ...state.projects[currentProject],
           data: {
             ...state.projects[currentProject].data,
             columns: {
              ...state.projects[currentProject].data.columns,
              [colName]: {
                id: colName,
                title: 'New Column',
                todoId: []
              }
             },
             columnCount: currentCol,
             columnsort: newColArray
           }
         }
       }
     })
   }
  return state;
}

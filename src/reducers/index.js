import { ADD_ARTICLE } from "../constants/action-types";
import { TOGGLE_POPUP } from "../constants/action-types";
import Data from '../Data';


const initialState = Data;


function rootReducer(state = initialState, action) {
  if (action.type === ADD_ARTICLE) {
    return Object.assign({}, state, {
      articles: state.articles.concat(action.payload)
    });
  } else if (action.type === TOGGLE_POPUP) {
      return Object.assign({}, state, {
        showPop: !state.showPop
      });
  }
  return state;
}


export default rootReducer;
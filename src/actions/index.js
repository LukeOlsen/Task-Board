import { ADD_ARTICLE } from "../constants/action-types";
import { TOGGLE_POPUP } from "../constants/action-types";

export function addArticle(payload) {
    return { type: ADD_ARTICLE, payload }
  };

  export function togglePopUp(payload) {
      return {type: TOGGLE_POPUP, payload}
  }
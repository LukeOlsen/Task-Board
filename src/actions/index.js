import { TOGGLE_POPUP } from "../constants/action-types";
import { MOVE_TODO } from "../constants/action-types";
import { EDIT_CARD } from "../constants/action-types";
import { ADD_TODO } from "../constants/action-types";
import { EDIT_TEMP_TITLE } from "../constants/action-types";
import { EDIT_TEMP_DESC } from "../constants/action-types";
import { EDIT_TEMP_DATE } from "../constants/action-types";


  export function togglePopUp(payload) {
      return {type: TOGGLE_POPUP, payload}
  }

  export function moveToDo(payload) {
      return {type: MOVE_TODO, payload}
  }

  export function addToDo(payload) {
      return {type: ADD_TODO, payload}
  }

  export function editCard(payload) {
      return {type: EDIT_CARD, payload}
  }

  export function editTempTitle(payload) {
      return {type: EDIT_TEMP_TITLE, payload}
  }

  export function editTempDate(payload) {
      return {type: EDIT_TEMP_DATE, payload}
  }

  export function editTempDescription(payload) {
      return {type: EDIT_TEMP_DESC, payload}
  }
import { TOGGLE_POPUP, COMPLETE_TODO, ADD_PROJECT, EDIT_PROJ_TITLE, EDIT_PROJ_TEMP_TITLE, SET_GUEST } from "../constants/action-types";
import { MOVE_TODO } from "../constants/action-types";
import { EDIT_CARD } from "../constants/action-types";
import { ADD_TODO } from "../constants/action-types";
import { EDIT_TEMP_TITLE } from "../constants/action-types";
import { EDIT_TEMP_DESC } from "../constants/action-types";
import { EDIT_TEMP_DATE } from "../constants/action-types";
import { SET_PROJECT } from "../constants/action-types";
import { FETCH_BOARD } from "../constants/action-types";
import { UPDATE_BOARD } from "../constants/action-types";


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

  export function completeToDo(payload) {
      return {type: COMPLETE_TODO, payload}
  }

  export function setActiveProject(payload) {
      return {type: SET_PROJECT, payload}
  }

  export function addProject(payload) {
      return {type: ADD_PROJECT, payload}
  }

  export function editProjectTitle(payload) {
      return ({type: EDIT_PROJ_TITLE, payload})
  }

  export function editProjectTempTitle(payload) {
      return ({type: EDIT_PROJ_TEMP_TITLE, payload})
  }

  export function fetchBoard(payload) {
      return({type: FETCH_BOARD, payload})
  }

  export function updateBoard(payload) {
      return({type: UPDATE_BOARD, payload})
  }

  export function setGuest(payload) {
      return({type: SET_GUEST, payload})
  }

  export function moveToGuestBoard(payload) {
      return
  }
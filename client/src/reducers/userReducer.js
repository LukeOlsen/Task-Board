import { SET_GUEST } from '../constants/action-types';

export default function userReducer(state = {hasUser: false}, action) {
    if (action.type === SET_GUEST) {
        return Object.assign({}, state, {
            ...state,
            user: 'Guest'
        })
    } else {
        return state
    }
}
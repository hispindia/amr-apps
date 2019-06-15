import { SET_ALERT, REMOVE_ALERT } from 'actions/types'

const INITIAL_STATE = null

export const alert = (state = INITIAL_STATE, { type, payload }) => {
    switch (type) {
        case SET_ALERT:
            return payload
        case REMOVE_ALERT:
            return INITIAL_STATE
        default:
            return state
    }
}

import { ADD_ALERT, REMOVE_ALERT } from 'actions/types'

const INITIAL_STATE = { nextId: 0, alerts: [] }

export const alert = (state = INITIAL_STATE, { type, payload }) => {
    switch (type) {
        case ADD_ALERT:
            return {
                nextId: state.nextId + 1,
                alerts: [...state.alerts, { ...payload, id: state.nextId }],
            }
        case REMOVE_ALERT:
            return {
                nextId: state.nextId,
                alerts: state.alerts.filter(({ id }) => id !== payload),
            }
        default:
            return state
    }
}

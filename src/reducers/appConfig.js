import { CONFIG_PROVIDED } from '../actions/types'

export const appConfig = (state = null, { type, payload }) => {
    switch (type) {
        case CONFIG_PROVIDED:
            return {
                ...state,
                categories: payload.categories,
                isApproval: payload.isApproval,
            }
        default:
            return state
    }
}

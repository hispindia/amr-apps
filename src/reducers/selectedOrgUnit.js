import { ORG_UNIT_SELECTED } from '../actions/types'

export const selectedOrgUnit = (state = null, { type, payload }) => {
    switch (type) {
        case ORG_UNIT_SELECTED:
            return { id: payload.id, path: payload.path }
        default:
            return state
    }
}

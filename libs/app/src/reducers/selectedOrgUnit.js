import { ORG_UNIT_SELECTED } from '../actions/types'

export const selectedOrgUnit = (state = null, { type, payload }) => {
    switch (type) {
        case ORG_UNIT_SELECTED:
            return payload
        default:
            return state
    }
}

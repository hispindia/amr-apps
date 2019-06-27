import { LOADING, READY, ERROR } from '../constants/statuses'
import { METADATA_RECEIVED, METADATA_ERRORED } from '../actions/types'

const INITIAL_STATE = { status: LOADING }

export const metadata = (state = INITIAL_STATE, { type, payload }) => {
    switch (type) {
        case METADATA_RECEIVED:
            return { status: READY, ...payload }
        case METADATA_ERRORED:
            return { status: ERROR }
        default:
            return state
    }
}

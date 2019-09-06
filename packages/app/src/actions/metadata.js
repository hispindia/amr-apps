import { initMetadata } from 'api'
import { createAction } from './createAction'
import { METADATA_RECEIVED, METADATA_ERRORED } from './types'
import { showAlert } from './alert'

export const setMetadata = isIsolate => async dispatch => {
    try {
        const metadata = await initMetadata(isIsolate)
        dispatch(createAction(METADATA_RECEIVED, metadata))
    } catch (error) {
        console.error(error)
        dispatch(createAction(METADATA_ERRORED))
        dispatch(showAlert('Failed to initiate app.', { critical: true }))
    }
}

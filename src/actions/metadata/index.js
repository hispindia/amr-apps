import { initMetadata } from 'api'
import { createAction } from '../createAction'
import { METADATA_RECEIVED, METADATA_ERRORED } from '../types'

export const setMetadata = () => async dispatch => {
    try {
        const metadata = await initMetadata()
        dispatch(createAction(METADATA_RECEIVED, metadata))
    } catch (error) {
        console.error(error)
        dispatch(createAction(METADATA_ERRORED, error))
    }
}
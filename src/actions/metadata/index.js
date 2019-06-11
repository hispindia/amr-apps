import { initMetadata } from 'api'
import { createAction } from '../createAction'
import { METADATA_RECEIVED, METADATA_ERRORED } from '../types'

export const setMetadata = () => async dispatch => {
    try {
        const metadata = await initMetadata()
        dispatch(createAction(METADATA_RECEIVED, metadata))
        console.log(metadata.programs)
    } catch (error) {
        console.error(error)
        dispatch(createAction(METADATA_ERRORED, error))
    }
}

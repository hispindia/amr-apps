import { getMetadata } from '../api'
import {
    createAction,
    showAlert,
    METADATA_RECEIVED,
    METADATA_ERRORED,
} from '@hisp-amr/app'

const reload = () => window.location.reload()

const actions = [{ label: 'Reload', onClick: reload }]

export const setMetadata = () => async dispatch => {
    try {
        const metadata = await getMetadata()
        dispatch(
            createAction(METADATA_RECEIVED, {
                programs: metadata.programs,
                optionSets: metadata.optionSets,
            })
        )
    } catch (error) {
        console.error(error)
        dispatch(createAction(METADATA_ERRORED))
        dispatch(
            showAlert('Failed to initiate app.', { critical: true, actions })
        )
    }
}

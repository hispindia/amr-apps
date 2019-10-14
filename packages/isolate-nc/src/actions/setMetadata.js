import { getMetadata } from '../api'
import {
    createAction,
    showAlert,
    METADATA_RECEIVED,
    METADATA_ERRORED,
} from '@hisp-amr/app'
import * as DATA_ELEMENTS from '../constants/dataElements'
import * as OPTION_SETS from '../constants/optionSets'

const toObject = (constants, array) => {
    const object = {}
    Object.keys(constants).forEach(key => {
        object[constants[key]] = array.find(({ id }) => id === constants[key])
    })
    return object
}

const reload = () => window.location.reload()

const actions = [{ label: 'Reload', onClick: reload }]

export const setMetadata = () => async dispatch => {
    try {
        const metadata = await getMetadata()

        metadata.dataElements = toObject(DATA_ELEMENTS, metadata.dataElements)

        metadata.optionSets = toObject(OPTION_SETS, metadata.optionSets)

        dispatch(createAction(METADATA_RECEIVED, metadata))
    } catch (error) {
        console.error(error)
        dispatch(createAction(METADATA_ERRORED))
        dispatch(
            showAlert('Failed to initiate app.', { critical: true, actions })
        )
    }
}

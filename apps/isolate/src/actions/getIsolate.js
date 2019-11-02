import { fetchIsolate } from '../api'
import {
    createAction,
    EXISTING_DATA_RECEIVED,
    eventRules,
    getRules,
    updateEventValue,
    ORGANISM_SET,
    showAlert,
    EXISTING_DATA_ERRORED,
} from '@hisp-amr/app'

export const getIsolate = eventId => async (dispatch, getState) => {
    const metadata = getState().metadata

    try {
        const data = await fetchIsolate(metadata.programs, eventId)

        data.rules = getRules(
            metadata.eventRules,
            data.program,
            data.programStage.id
        )

        const [eventValues, programStage, invalid] = eventRules(
            data.eventValues,
            data.programStage,
            {
                rules: data.rules,
                optionSets: metadata.optionSets,
                pushChanges: !data.status.completed,
                updateValue: (key, value) =>
                    updateEventValue(data.eventId, key, value),
            }
        )

        data.eventValues = eventValues
        data.programStage = programStage
        data.programs = metadata.programList
        data.organisms = metadata.optionSets[ORGANISM_SET]
        data.invalid = invalid

        dispatch(createAction(EXISTING_DATA_RECEIVED, data))
        if (data.status.completed)
            dispatch(showAlert('Isolate has already been completed.'))
    } catch (error) {
        console.error(error)
        dispatch(showAlert('Failed to get isolate.', { critical: true }))
        dispatch(createAction(EXISTING_DATA_ERRORED))
    }
}

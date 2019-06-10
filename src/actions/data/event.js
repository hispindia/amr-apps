import { createAction } from '../createAction'
import {
    EXISTING_DATA_RECEIVED,
    EXISTING_DATA_ERRORED,
    DISABLE_BUTTONS,
    RESET_PANEL_EVENT,
    SET_INCOMPLETED,
    SET_DELETE_PROMPT,
} from '../types'
import { existingRecord, setEventStatus, updateEventValue } from 'api'
import { entityRules } from './entityRules'

export const getExistingEvent = (eventId, orgUnit) => async (
    dispatch,
    getState
) => {
    const getCode = () => {
        for (const ou of getState().metadata.orgUnits) {
            if (ou.id === orgUnit) return ou.code
            if (ou.children) {
                const code = getCode(ou.children)
                if (code) return code
            }
        }
    }

    const state = getState().data
    const isApproval = state.appConfig.isApproval
    const { l1Member, l2Member } = state.metadata.user
    const programs = state.metadata.programs
    const { trackedEntityTypeAttributes, rules } = state.metadata.person
    try {
        const data = await existingRecord(programs, eventId, {
            isApproval,
            l1Member,
            l2Member,
        })
        const [values, attributes] = entityRules(data.newValues, attributes, {
            rules,
            attributes: trackedEntityTypeAttributes,
            uniques: [],
        })
        data.entityVales = values
        data.entityAttributes = attributes
        data.orgUnit = { id: orgUnit, code: getCode() }
        dispatch(createAction(EXISTING_DATA_RECEIVED, data))
    } catch (error) {
        console.error(error)
        dispatch(createAction(EXISTING_DATA_ERRORED, error))
    }
}

export const disabledButtons = () => dispatch =>
    dispatch(createAction(DISABLE_BUTTONS))

export const submitEvent = addMore => async (dispatch, getState) => {
    dispatch(disabledButtons())
    const isApproval = getState().appConfig.isApproval
    const eventId = getState().data.event.id
    await setEventStatus(eventId, true, isApproval)
    if (addMore) dispatch(createAction(RESET_PANEL_EVENT))
}

export const editEvent = () => async (dispatch, getState) => {
    dispatch(disabledButtons())
    const eventId = getState().data.event.id
    await setEventStatus(eventId)
    dispatch(createAction(SET_INCOMPLETED))
}

export const setDeletePrompt = deletePrompt => dispatch =>
    dispatch(createAction(SET_DELETE_PROMPT, deletePrompt))

export const deleteEvent = confirmed => async (dispatch, getState) => {
    if (!confirmed) dispatch(setDeletePrompt(false))
    else {
        const eventId = getState().data.event.id
        await deleteEvent(eventId)
    }
}

export const setEventValue = (key, value) => (dispatch, getState) => {
    const eventId = getState().data.event.id
    updateEventValue(eventId, key, value)
    // rules and stuff
}

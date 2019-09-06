import { batch } from 'react-redux'
import { createAction } from '../createAction'
import {
    SET_ENTITY_AND_ORG_UNIT,
    RESET_DATA,
    EXISTING_DATA_RECEIVED,
    EXISTING_DATA_ERRORED,
    NEW_EVENT_ERRORED,
    DISABLE_BUTTONS,
    RESET_PANEL_EVENT,
    SET_INCOMPLETED,
    SET_DELETE_PROMPT,
    SET_EVENT_AND_ENTITY,
    SET_EVENT_VALUES_AND_PROGRAMSTAGE,
    DUPLICACY,
    ENABLE_BUTTONS,
    EXIT,
    SET_BUTTON_LOADING,
} from '../types'
import {
    existingRecord,
    newRecord,
    setEventStatus,
    updateEventValue,
    deleteEvent,
    isDuplicateRecord,
} from 'api'
import { entityRules, eventRules, getRules } from 'helpers'
import { DUPLICATE_CHECKING } from 'constants/duplicacy'
import { LOADING, SUCCESS } from 'constants/statuses'
import { SAMPLE_ID_ELEMENT, ORGANISM_SET } from 'constants/dhis2'
import { showAlert } from '../alert'

export const resetData = () => dispatch => dispatch(createAction(RESET_DATA))

export const disableButtons = () => dispatch =>
    dispatch(createAction(DISABLE_BUTTONS))

export const enableButtons = () => dispatch =>
    dispatch(createAction(ENABLE_BUTTONS))

export const setButtonLoading = payload => dispatch =>
    dispatch(createAction(SET_BUTTONS, payload))

export const initNewEvent = orgUnit => (dispatch, getState) => {
    const entityMetadata = getState().metadata.person
    const optionSets = getState().metadata.optionSets
    const orgUnits = getState().metadata.orgUnits
    const programs = getState().metadata.programList.filter(p =>
        p.orgUnits.includes(orgUnit)
    )
    const [values, attributes] = entityRules(
        entityMetadata.values,
        entityMetadata.trackedEntityTypeAttributes,
        {
            rules: entityMetadata.rules,
            optionSets,
            uniques: {},
        }
    )
    orgUnit = { id: orgUnit, code: getCode(orgUnit, orgUnits) }
    dispatch(
        createAction(SET_ENTITY_AND_ORG_UNIT, {
            values,
            id: null,
            valid: false,
            attributes,
            orgUnit,
            programs,
        })
    )
}

const getCode = (orgUnit, orgUnits) => {
    for (const ou of orgUnits) {
        if (ou.id === orgUnit) return ou.code
        if (ou.children) {
            const code = getCode(orgUnit, ou.children)
            if (code) return code
        }
    }
}

export const getExistingEvent = (orgUnit, eventId) => async (
    dispatch,
    getState
) => {
    const state = getState()
    const programs = state.metadata.programs
    const optionSets = state.metadata.optionSets
    const { trackedEntityTypeAttributes, rules } = state.metadata.person
    try {
        const data = await existingRecord(programs, eventId)

        const [entityValues, attributes] = entityRules(
            { ...state.metadata.person.values, ...data.entityValues },
            trackedEntityTypeAttributes,
            {
                rules,
                optionSets,
                uniques: [],
            }
        )
        data.eventRules = getRules(
            state.metadata.eventRules,
            data.program,
            data.programStage.id
        )
        const [eventValues, programStage, invalid] = eventRules(
            data.eventValues,
            data.programStage,
            {
                rules: data.eventRules,
                optionSets,
                pushChanges: !data.status.completed,
                updateValue: (key, value) =>
                    updateEventValue(data.eventId, key, value),
            }
        )
        data.entityValues = entityValues
        data.entityAttributes = attributes
        data.eventValues = eventValues
        data.programStage = programStage
        data.orgUnit = {
            id: orgUnit,
            code: getCode(orgUnit, state.metadata.orgUnits),
        }
        data.programs = state.metadata.programList
        data.organisms = optionSets[ORGANISM_SET]
        data.invalid = invalid
        data.rules = getRules(
            state.metadata.eventRules,
            data.program,
            data.programStage.id
        )
        dispatch(createAction(EXISTING_DATA_RECEIVED, data))
    } catch (error) {
        console.error(error)
        dispatch(showAlert('Failed to get record.', { critical: true }))
        dispatch(createAction(EXISTING_DATA_ERRORED))
    }
}

export const createNewEvent = () => async (dispatch, getState) => {
    dispatch(disableButtons)

    const orgUnit = getState().data.orgUnit
    const entity = getState().data.entity
    const panel = getState().data.panel
    const metadata = getState().metadata
    const rules = getRules(
        metadata.eventRules,
        panel.program,
        panel.programStage
    )

    try {
        const data = await newRecord(
            panel.program,
            metadata.programs
                .find(p => p.id === panel.program)
                .programStages.find(s => s.id === panel.programStage),
            {
                orgaCode: panel.organism,
                ou: orgUnit.id,
                eId: entity.id,
                eValues: !entity.id || entity.editing ? entity.values : null,
                sampleDate: panel.sampleDate,
                orgUnitCode: orgUnit.code,
            }
        )
        const [values, programStage, invalid] = eventRules(
            data.eventValues,
            data.programStage,
            {
                rules,
                optionSets: metadata.optionSets,
                pushChanges: !data.status.completed,
                updateValue: (name, value) =>
                    updateEventValue(data.eventId, name, value),
            }
        )
        dispatch(
            createAction(SET_EVENT_AND_ENTITY, {
                values,
                eventId: data.eventId,
                programStage,
                status: data.status,
                rules,
                entityId: entity.id ? entity.id : data.entityId,
                invalid,
            })
        )
    } catch (error) {
        console.error(error)
        dispatch(showAlert('Failed to create record.', { critical: true }))
        dispatch(createAction(NEW_EVENT_ERRORED))
    }
}

export const submitEvent = addMore => async (dispatch, getState) => {
    batch(() => {
        dispatch(disableButtons())
        dispatch(
            createAction(SET_BUTTON_LOADING, addMore ? 'submitAdd' : 'submit')
        )
    })
    const eventId = getState().data.event.id

    try {
        await setEventStatus(eventId, true)
        if (addMore) dispatch(createAction(RESET_PANEL_EVENT))
        else dispatch(createAction(EXIT))
        dispatch(showAlert('Record submitted successfully.', { success: true }))
    } catch (error) {
        console.error(error)
        dispatch(showAlert('Failed to submit record.', { critical: true }))
        dispatch(createAction(ENABLE_BUTTONS))
    } finally {
        batch(() => {
            dispatch(enableButtons())
            dispatch(createAction(SET_BUTTON_LOADING, false))
        })
    }
}

export const editEvent = () => async (dispatch, getState) => {
    batch(() => {
        dispatch(disableButtons())
        dispatch(createAction(SET_BUTTON_LOADING, 'edit'))
    })
    const eventId = getState().data.event.id

    try {
        await setEventStatus(eventId)
        dispatch(createAction(SET_INCOMPLETED))
        dispatch(showAlert('Record is editable.'))
    } catch (error) {
        console.error(error)
        dispatch(showAlert('Failed to edit record.', { critical: true }))
    } finally {
        batch(() => {
            dispatch(createAction(SET_BUTTON_LOADING, false))
            dispatch(enableButtons())
        })
    }
}

export const setDeletePrompt = deletePrompt => dispatch =>
    dispatch(createAction(SET_DELETE_PROMPT, deletePrompt))

export const onDeleteConfirmed = confirmed => async (dispatch, getState) => {
    if (!confirmed) {
        dispatch(setDeletePrompt(false))
        return
    }

    dispatch(setDeletePrompt(LOADING))

    const eventId = getState().data.event.id

    try {
        const response = (await deleteEvent(eventId)).response
        if (response.importCount.deleted !== 1) throw response.description
        dispatch(showAlert('Record deleted successfully.', {}))
        dispatch(setDeletePrompt(SUCCESS))
    } catch (error) {
        console.error(error)
        dispatch(showAlert('Failed to delete record.', { critical: true }))
        dispatch(setDeletePrompt(true))
    }
}

export const setEventValue = (key, value) => (dispatch, getState) => {
    const event = getState().data.event
    if (event.values[key] === value) return
    const optionSets = getState().metadata.optionSets

    updateEventValue(event.id, key, value)

    if (key === SAMPLE_ID_ELEMENT) dispatch(checkDuplicacy(value))

    const [values, programStage, invalid] = eventRules(
        { ...event.values, [key]: value },
        event.programStage,
        {
            rules: event.rules,
            optionSets,
            pushChanges: !event.status.completed,
            updateValue: (key, value) => updateEventValue(event.id, key, value),
        }
    )

    dispatch(
        createAction(SET_EVENT_VALUES_AND_PROGRAMSTAGE, {
            programStage,
            values,
            invalid,
        })
    )
}

export const checkDuplicacy = sampleId => async (dispatch, getState) => {
    dispatch(createAction(DUPLICACY, DUPLICATE_CHECKING))
    const event = getState().data.event.id
    const entity = getState().data.entity.id
    const organism = getState().data.panel.organism
    const duplicate = await isDuplicateRecord({
        event,
        entity,
        organism,
        sampleId,
    })
    dispatch(createAction(DUPLICACY, duplicate))
}

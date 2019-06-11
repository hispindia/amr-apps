import { createAction } from '../createAction'
import {
    SET_ENTITY_AND_ORG_UNIT,
    EXISTING_DATA_RECEIVED,
    EXISTING_DATA_ERRORED,
    DISABLE_BUTTONS,
    RESET_PANEL_EVENT,
    SET_INCOMPLETED,
    SET_DELETE_PROMPT,
    SET_EVENT_AND_ENTITY,
    SET_EVENT_VALUES_AND_PROGRAMSTAGE,
} from '../types'
import {
    existingRecord,
    newRecord,
    setEventStatus,
    updateEventValue,
} from 'api'
import { entityRules } from './entityRules'
import { eventRules } from './eventRules'

export const disableButtons = () => dispatch =>
    dispatch(createAction(DISABLE_BUTTONS))

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
            const code = getCode(ou.children)
            if (code) return code
        }
    }
}

export const getExistingEvent = (eventId, orgUnit) => async (
    dispatch,
    getState
) => {
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
        data.orgUnit = { id: orgUnit, code: getCode(orgUnit, orgUnits) }
        dispatch(createAction(EXISTING_DATA_RECEIVED, data))
    } catch (error) {
        console.error(error)
        dispatch(createAction(EXISTING_DATA_ERRORED, error))
    }
}

// TODO: check if entity values changed (editing)
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
    const data = await newRecord(
        panel.program,
        metadata.programs
            .find(p => p.id === panel.program)
            .programStages.find(s => s.id === panel.programStage),
        {
            orgaCode: panel.organism,
            ou: orgUnit.id,
            eId: entity.id,
            eValues: null, //entity.values,
            sampleDate: panel.sampleDate,
            orgUnitCode: orgUnit.code,
        }
    )
    const [values, programStage] = eventRules(
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
        })
    )
}

export const submitEvent = addMore => async (dispatch, getState) => {
    dispatch(disableButtons())
    const isApproval = getState().appConfig.isApproval
    const eventId = getState().data.event.id
    await setEventStatus(eventId, true, isApproval)
    if (addMore) dispatch(createAction(RESET_PANEL_EVENT))
}

export const editEvent = () => async (dispatch, getState) => {
    dispatch(disableButtons())
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
    const event = getState().data.event
    const optionSets = getState().metadata.optionSets
    updateEventValue(event.id, key, value)
    const [values, programStage] = eventRules(
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
        })
    )
}

const getRules = (rules, programId, programStageId) =>
    rules.filter(
        r =>
            (r.programStage ? r.programStage.id === programStageId : false) ||
            (r.program.id === programId &&
                (r.programStage ? r.programStage.id === programStageId : true))
    )

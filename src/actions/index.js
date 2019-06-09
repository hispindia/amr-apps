import * as ACTIONS from './types'
import {
    initMetadata,
    getPersonValues,
    checkUnique,
    existingRecord,
    setEventStatus,
} from 'api'
import { entityRules } from './entityRules'

export const setMetadata = () => async dispatch => {
    try {
        const metadata = await initMetadata()
        dispatch(createAction(ACTIONS.METADATA_RECEIVED, metadata))
        console.log(metadata)
    } catch (error) {
        console.error(error)
        dispatch(createAction(ACTIONS.METADATA_ERRORED, error))
    }
}

export const setOrgUnit = (id, path) => dispatch =>
    dispatch(createAction(ACTIONS.ORG_UNIT_SELECTED, { id, path }))

export const getEntity = id => async dispatch => {
    const { trackedEntityTypeAttributes, rules } = getState().metadata.person
    const [values, attributes] = entityRules(
        await getPersonValues(id),
        trackedEntityTypeAttributes,
        {
            rules,
            attributes: trackedEntityTypeAttributes,
            uniques: {},
        }
    )

    dispatch(
        createAction(ACTIONS.SET_ENTITY, {
            values,
            id,
            valid: true,
            attributes,
        })
    )
}

export const setEntityValue = (key, value) => (dispatch, getState) => {
    const state = getState()
    const [values, attributes, valid] = entityRules(
        { ...state.data.entity.values, [key]: value },
        state.data.entity.attributes,
        {
            rules: state.metadata.person.rules,
            attributes,
            uniques: state.data.entity.uniques,
        }
    )
    dispatch(
        createAction(ACTIONS.SET_ENTITY_VALUE, { values, attributes, valid })
    )
}

export const validateUnique = (id, value, label) => async (
    dispatch,
    getState
) => {
    const dataState = getState().data
    const entityId = await checkUnique(id, value, dataState.orgUnit)

    if (entityId)
        dispatch(
            createAction(ACTION.SET_ENTITY_MODAL_AND_UNIQUES, {
                modal: { id, label, entityId, uniques },
                uniques: {
                    ...dataState.entity.uniques,
                    [dataState.entity.modal.id]: !!entityId,
                },
            })
        )
    else
        dispatch(
            createAction(ACTION.SET_UNIQUE, { key: id, value: !!entityId })
        )

    return !newEntityId
}

export const removeModal = importEntity => async (dispatch, getState) => {
    const entity = getState().data.entity
    const uniques = { ...entity.uniques, [entity.modal.id]: !!importEntity }
    if (importEntity) await dispatch(getEntity(entity.modal.entityId))
    else
        dispatch(
            createAction(ACTION.SET_ENTITY_MODAL_AND_UNIQUES, {
                modal: null,
                uniques,
            })
        )
}

export const setEditing = () => dispatch =>
    dispatch(createAction(ACTION.SET_EDITING))

export const resetEntity = () => dispatch => {
    const attributes = state.metadata.person.trackedEntityTypeAttributes
    dispatch(createAction(ACTION.RESET_ENTITY, attributes))
}

export const setProgram = program => (dispatch, getState) => {
    const { programOrganisms, optionSets, stageLists } = getState().metadata
    const organisms = []
    optionSets[programOrganisms[program]].forEach(o => {
        if (!organisms.find(org => org.value === o.value)) organisms.push(o)
    })
    const programStage =
        stageLists[program].length > 1 ? '' : stageLists[program][0].value

    dispatch(
        createAction(ACTIONS.SET_PANEL, {
            program,
            programStage,
            organism: '',
            sampleDate: '',
            organisms,
            valid: false,
        })
    )
}

export const setPanelValue = (key, value) => (dispatch, getState) => {
    const {
        program,
        programStage,
        organism,
        sampleDate,
    } = getState().data.panel
    const values = { program, programStage, organism, sampleDate }

    if (values[key] === value) return
    const valid = !Object.values({ ...values, [key]: value }).includes('')

    dispatch(
        createAction(ACTIONS.SET_PANEL_VALUE, {
            key,
            value,
            valid,
        })
    )
}

export const resetPanel = () => dispatch =>
    dispatch(createAction(ACTIONS.RESET_PANEL))

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
        dispatch(createAction(ACTIONS.EXISTING_DATA_RECEIVED, data))
    } catch (error) {
        console.error(error)
        dispatch(createAction(ACTIONS.EXISTING_DATA_ERRORED, error))
    }
}

export const disabledButtons = () => dispatch =>
    dispatch(createAction(ACTIONS.DISABLE_BUTTONS))

export const submitEvent = addMore => async (dispatch, getState) => {
    dispatch(disabledButtons())
    const isApproval = getState().appConfig.isApproval
    const eventId = getState().data.event.id
    await setEventStatus(eventId, true, isApproval)
    if (addMore) dispatch(createAction(ACTIONS.RESET_PANEL_EVENT))
}

export const editEvent = () => async (dispatch, getState) => {
    dispatch(disabledButtons())
    await setEventStatus(eventId)
}

const createAction = (type, payload) => ({ type, payload })

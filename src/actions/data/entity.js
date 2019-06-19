import { createAction } from '../createAction'
import {
    SET_ENTITY,
    SET_ENTITY_VALUE,
    SET_ENTITY_MODAL_AND_UNIQUES,
    SET_UNIQUE,
    SET_MODAL_LOADING,
} from '../types'
import { showAlert } from '../alert'
import { getPersonValues, checkUnique } from 'api'
import { entityRules } from './entityRules'

export const getEntity = id => async (dispatch, getState) => {
    dispatch(createAction(SET_MODAL_LOADING, true))
    const optionSets = getState().metadata.optionSets
    const { trackedEntityTypeAttributes, rules } = getState().metadata.person
    const uniques = getState().data.entity.uniques
    Object.keys(uniques).forEach(id => (uniques[id] = true))
    try {
        const entityValues = await getPersonValues(id)
        if (!entityValues) throw 'Failed to get person.'
        const [values, attributes] = entityRules(
            entityValues,
            trackedEntityTypeAttributes,
            {
                rules,
                optionSets,
                uniques: {},
            }
        )

        dispatch(
            createAction(SET_ENTITY, {
                values,
                id,
                valid: true,
                attributes,
                uniques,
            })
        )
    } catch (error) {
        console.error(error)
        dispatch(showAlert('Failed to get person.', { critical: true }))
        dispatch(createAction(SET_MODAL_LOADING, false))
    }
}

export const setEntityValue = (key, value) => (dispatch, getState) => {
    const optionSets = getState().metadata.optionSets
    const state = getState()
    const [values, attributes, valid] = entityRules(
        { ...state.data.entity.values, [key]: value },
        state.data.entity.attributes,
        {
            rules: state.metadata.person.rules,
            optionSets,
            uniques: state.data.entity.uniques,
        }
    )
    dispatch(createAction(SET_ENTITY_VALUE, { values, attributes, valid }))
}

export const validateUnique = (id, value, label) => async (
    dispatch,
    getState
) => {
    const dataState = getState().data
    try {
        const entityId = await checkUnique(id, value, dataState.orgUnit.id)

        if (entityId)
            dispatch(
                createAction(SET_ENTITY_MODAL_AND_UNIQUES, {
                    modal: { id, label, entityId },
                    uniques: {
                        ...dataState.entity.uniques,
                        [id]: !entityId,
                    },
                })
            )
        else dispatch(createAction(SET_UNIQUE, { key: id, value: !entityId }))
    } catch (error) {
        console.error(error)
        dispatch(showAlert(`Failed to validate ${label}`, { critical: true }))
    }
}

export const removeModal = importEntity => async (dispatch, getState) => {
    const entity = getState().data.entity
    const uniques = { ...entity.uniques, [entity.modal.id]: !!importEntity }
    if (importEntity) await dispatch(getEntity(entity.modal.entityId))
    else
        dispatch(
            createAction(SET_ENTITY_MODAL_AND_UNIQUES, {
                modal: null,
                uniques,
            })
        )
}

export const setEditing = () => dispatch => dispatch(createAction(SET_EDITING))

export const resetEntity = () => (dispatch, getState) => {
    const entityMetadata = getState().metadata.person
    const optionSets = getState().metadata.optionSets
    const [values, attributes] = entityRules(
        entityMetadata.values,
        entityMetadata.trackedEntityTypeAttributes,
        {
            rules: entityMetadata.rules,
            optionSets,
            uniques: {},
        }
    )
    dispatch(
        createAction(SET_ENTITY, {
            values,
            id: null,
            valid: false,
            uniques: {},
            attributes,
        })
    )
}

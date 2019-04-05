import { useReducer } from 'react'
import { _organismsDataElementId } from '../../'

const types = {
    SET_ENTITY: 0,
    SET_PANEL: 1,
    NEW_RECORD: 2,
    EXISTING_RECORD: 3,
    EDIT: 4,
    DISABLE_BUTTON: 5,
    EVENT_VALID: 6
}

const getRules = (rules, programId, programStageId) =>
    rules.filter(r =>
        (r.programStage ? r.programStage.id === programStageId : false) ||
        (r.program.id === programId &&
        (r.programStage ? r.programStage.id === programStageId : true))
    )

const reducer = (state, action) => {
    switch (action.type) {
        case types.SET_ENTITY: {
            return {
                ...state,
                entityValues: action.values,
                entityId: action.id,
                entityValid: action.valid
            }
        }
        case types.SET_PANEL: {
            return {
                ...state,
                programId: action.programId,
                programStageId: action.programStageId,
                organism: action.organism,
                sampleDate: action.sampleDate,
                panelValid: action.valid,
                rules: getRules(
                    state.allRules,
                    action.programId,
                    action.programStageId
                )
            }
        }
        case types.NEW_RECORD: {
            return {
                ...state,
                programStage: action.programStage,
                eventValues: action.eventValues,
                status: action.status,
                eventId: action.eventId,
                entityId: state.entityId
                    ? state.entityId
                    : action.entityId,
                loading: false,
                buttonDisabled: false
            }
        }
        case types.EXISTING_RECORD: {
            return {
                ...state,
                entityId: action.entityId,
                programId: action.programId,
                programStageId: action.programStage.id,
                organism: action.eventValues[_organismsDataElementId],
                sampleDate: action.sampleDate,
                panelValid: true,
                programStage: action.programStage,
                eventValues: action.eventValues,
                status: action.status,
                eventId: action.eventId,
                loading: false,
                buttonDisabled: false,
                rules: getRules(
                    state.allRules,
                    action.programId,
                    action.programStage.id
                )
            }
        }
        case types.ADD_MORE: {
            return {
                ...state,
                programId: null,
                programStageId: null,
                organism: null,
                sampleDate: null,
                panelValid: false,
                eventData: null,
                eventValid: false,
                resetSwitch: !state.resetSwitch,
                buttonDisabled: false
            }
        }
        case types.EDIT: {
            return {
                ...state,
                status: {
                    ...state.status, 
                    ...{completed: false}
                },
                buttonDisabled: false
            }
        }
        case types.DISABLE_BUTTON: {
            return {
                ...state,
                buttonDisabled: action.buttonDisabled
            }
        }
        case types.EVENT_VALID: {
            return {
                ...state,
                eventValid: action.valid
            }
        }
        default: {
            return state
        }
    }
}

export const hook = (rules, personValues) => {
    const [state, dispatch] = useReducer(reducer, {
        allRules: rules,
        entityId: null,
        entityValues: personValues,
        entityValid: false,
        programId: null,
        programStageId: null,
        organism: null,
        sampleDate: null,
        panelValid: false,
        eventId: null,
        eventValues: null,
        status: null,
        programStage: null,
        rules: null,
        eventValid: false,
        resetSwitch: false,
        buttonDisabled: false,
        loading: false
    })

    return [state, dispatch, types]
}
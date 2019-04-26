import { useReducer, useContext } from 'react'
import { MetadataContext } from 'contexts'
import { _organismsDataElementId } from '../../'

const types = {
    SET_ENTITY: 0,
    SET_PANEL: 1,
    NEW_RECORD: 2,
    EXISTING_RECORD: 3,
    EDIT: 4,
    DISABLE_BUTTON: 5,
    EVENT_VALID: 6,
    DELETE_CLICKED: 7,
    DELETE_CONFIRMED: 8,
    SET_LOADING: 9,
    SET_CODE: 10,
    SET_DUPLICATE: 11,
    SET_ENTITY_VALUE: 12,
}

const invalidReason = {
    required: 'A required field is empty',
    error: 'A field is invalid',
}

const getRules = (rules, programId, programStageId) =>
    rules.filter(
        r =>
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
                entityValid: action.valid,
            }
        }
        case types.SET_ENTITY_VALUE: {
            return {
                ...state,
                entityValues: {
                    ...state.entityValues,
                    [action.key]: action.value,
                },
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
                ),
            }
        }
        case types.NEW_RECORD: {
            return {
                ...state,
                programStage: action.programStage,
                eventValues: action.eventValues,
                status: action.status,
                eventId: action.eventId,
                entityId: state.entityId ? state.entityId : action.entityId,
                loading: false,
                buttonDisabled: false,
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
                ),
            }
        }
        case types.ADD_MORE: {
            return {
                ...state,
                programId: '',
                programStageId: '',
                organism: '',
                sampleDate: '',
                panelValid: false,
                eventData: null,
                eventInvalid: invalidReason.required,
                eventId: null,
                buttonDisabled: false,
            }
        }
        case types.EDIT: {
            return {
                ...state,
                status: {
                    ...state.status,
                    ...{ completed: false },
                },
                buttonDisabled: false,
            }
        }
        case types.DISABLE_BUTTON: {
            return {
                ...state,
                buttonDisabled: action.buttonDisabled,
            }
        }
        case types.EVENT_VALID: {
            if (state.duplicate) return state
            return {
                ...state,
                eventInvalid: action.invalid,
            }
        }
        case types.DELETE_CLICKED: {
            return {
                ...state,
                buttonDisabled: true,
                deleteClicked: true,
            }
        }
        case types.DELETE_CONFIRMED: {
            return {
                ...state,
                deleteClicked: false,
                deleteConfirmation: action.delete,
            }
        }
        case types.SET_LOADING: {
            return {
                ...state,
                loading: true,
            }
        }
        case types.SET_CODE: {
            return {
                ...state,
                code: action.code,
            }
        }
        case types.SET_DUPLICATE: {
            return {
                ...state,
                duplicate: action.duplicate,
                eventInvalid: action.duplicate
                    ? invalidReason.error
                    : state.eventInvalid,
            }
        }
        default: {
            return state
        }
    }
}

export const hook = orgUnit => {
    const { programs, person, programList } = useContext(MetadataContext)
    const [state, dispatch] = useReducer(reducer, {
        allRules: programs.rules,
        entityId: null,
        entityValues: person.values,
        entityValid: false,
        programId: '',
        programStageId: '',
        organism: '',
        sampleDate: '',
        panelValid: false,
        eventId: null,
        eventValues: null,
        status: null,
        programStage: null,
        rules: null,
        eventInvalid: invalidReason.required,
        buttonDisabled: false,
        loading: false,
        deleteClicked: false,
        deleteConfirmation: null,
        duplicate: false,
        panelPrograms: programList.filter(p => p.orgUnits.includes(orgUnit)),
        orgUnit: orgUnit,
    })

    return [state, dispatch, types]
}

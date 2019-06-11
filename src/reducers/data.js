import { LOADING, READY, ERROR } from '../constants/statuses'
import { _organismsDataElementId } from 'api'
import {
    SET_ENTITY,
    SET_ENTITY_VALUE,
    SET_UNIQUE,
    SET_ENTITY_MODAL_AND_UNIQUES,
    SET_EDITING,
    SET_PANEL,
    SET_PANEL_VALUE,
    RESET_PANEL,
    EXISTING_DATA_RECEIVED,
    EXISTING_DATA_ERRORED,
    DISABLE_BUTTONS,
    RESET_PANEL_EVENT,
    SET_INCOMPLETED,
    SET_DELETE_PROMPT,
    SET_ENTITY_AND_ORG_UNIT,
    SET_EVENT_VALUE,
    SET_EVENT_AND_ENTITY,
    SET_EVENT_VALUES_AND_PROGRAMSTAGE,
} from '../actions/types'

const INITIAL_STATE = {
    status: LOADING,
    entity: {
        values: null,
        id: null,
        attributes: null,
        uniques: [],
        valid: false,
    },
    panel: {
        program: '',
        programStage: '',
        organism: '',
        sampleDate: '',
        valid: false,
    },
    event: {
        values: null,
        programStage: null,
        status: null,
        id: null,
        rules: null,
        duplicate: false,
    },
}

export const data = (state = INITIAL_STATE, { type, payload }) => {
    switch (type) {
        case SET_ENTITY:
            return {
                ...state,
                entity: {
                    values: payload.values,
                    id: payload.id,
                    valid: payload.valid,
                    attributes: payload.attributes,
                    uniques: {},
                    modal: null,
                },
            }
        case SET_ENTITY_VALUE:
            return {
                ...state,
                entity: {
                    ...state.entity,
                    values: payload.values,
                    attributes: payload.attributes,
                    valid: payload.valid,
                },
            }
        case SET_UNIQUE:
            return {
                ...state,
                entity: {
                    ...state.entity,
                    uniques: {
                        ...state.entity.uniques,
                        [payload.key]: payload.value,
                    },
                },
            }
        case SET_ENTITY_MODAL_AND_UNIQUES:
            return {
                ...state,
                entity: {
                    ...state.entity,
                    modal: payload.modal,
                    uniques: payload.uniques,
                },
            }
        case SET_EDITING:
            return {
                ...state,
                entity: {
                    ...state.entity,
                    editing: true,
                },
            }
        case SET_PANEL:
            return {
                ...state,
                panel: {
                    program: payload.program,
                    programStage: payload.programStage,
                    organism: payload.organism,
                    sampleDate: payload.sampleDate,
                    programs: state.panel.programs,
                    organisms: payload.organisms,
                    valid: payload.valid,
                },
            }
        case SET_PANEL_VALUE:
            return {
                ...state,
                panel: {
                    ...state.panel,
                    [payload.key]: payload.value,
                    valid: payload.valid,
                },
            }
        case RESET_PANEL:
            return {
                ...state,
                panel: {
                    ...state.panel,
                    program: '',
                    programStage: '',
                    organism: '',
                    sampleDate: '',
                    valid: false,
                },
            }
        case SET_ENTITY_AND_ORG_UNIT: {
            return {
                ...state,
                entity: {
                    values: payload.values,
                    id: payload.id,
                    valid: payload.valid,
                    attributes: payload.attributes,
                    uniques: {},
                    modal: null,
                },
                panel: {
                    ...state.panel,
                    programs: payload.programs,
                },
                orgUnit: payload.orgUnit,
            }
        }
        case EXISTING_DATA_RECEIVED:
            return {
                entity: {
                    values: payload.entityValues,
                    id: payload.entityId,
                    attributes: payload.entityAttributes,
                    uniques: {},
                    valid: true,
                },
                panel: {
                    program: payload.program,
                    programStage: payload.programStage.id,
                    organism: payload.eventValues[_organismsDataElementId],
                    sampleDate: payload.sampleDate,
                    valid: true,
                },
                event: {
                    values: payload.eventValues,
                    programStage: payload.programStage,
                    status: payload.status,
                    id: payload.eventId,
                    rules: payload.rules,
                    duplicate: false,
                },
                orgUnit: payload.orgUnit,
                status: READY,
            }
        case EXISTING_DATA_ERRORED:
            return { status: ERROR }
        case DISABLE_BUTTONS:
            return {
                ...state,
                buttonsDisabled: true,
            }
        case RESET_PANEL_EVENT:
            return {
                ...state,
                panel: {
                    ...state.panel,
                    program: '',
                    programStage: '',
                    organism: '',
                    sampleDate: '',
                    valid: false,
                },
                event: null,
            }
        case SET_INCOMPLETED:
            return {
                ...state,
                event: {
                    ...state.event,
                    status: {
                        ...state.event.status,
                        completed: false,
                    },
                },
            }
        case SET_DELETE_PROMPT:
            return {
                ...state,
                deletePrompt: payload,
            }
        case SET_EVENT_VALUE:
            return {
                ...state,
                event: {
                    ...state.event,
                    values: {
                        ...state.event.values,
                        [payload.key]: payload.value,
                    },
                },
            }
        case SET_EVENT_AND_ENTITY:
            return {
                ...state,
                entity: {
                    ...state.entity,
                    id: payload.entityId,
                },
                event: {
                    ...state.event,
                    id: payload.eventId,
                    programStage: payload.programStage,
                    rules: payload.rules,
                    status: payload.status,
                    values: payload.values,
                },
            }
        case SET_EVENT_VALUES_AND_PROGRAMSTAGE:
            return {
                ...state,
                event: {
                    ...state.event,
                    programStage: payload.programStage,
                    values: payload.values,
                },
            }
        default:
            return state
    }
}

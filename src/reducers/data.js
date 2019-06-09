import { LOADING, READY, ERROR } from '../constants/statuses'
import { _organismsDataElementId } from 'api'
import {
    SET_ENTITY,
    UPDATE_ENTITY,
    SET_UNIQUE,
    SET_ENTITY_MODAL_AND_UNIQUES,
    SET_EDITING,
    RESET_ENTITY,
    SET_PANEL,
    SET_PANEL_VALUE,
    RESET_PANEL,
    EXISTING_DATA_RECEIVED,
    EXISTING_DATA_ERRORED,
    DISABLE_BUTTONS,
    RESET_PANEL_EVENT,
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
        programId: null,
        programStageId: null,
        organism: null,
        sampleDate: null,
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
        case UPDATE_ENTITY:
            return {
                ...state,
                entity: {
                    ...state.entity,
                    values: payload.values,
                    attributes: payload.attributes,
                    uniques: payload.uniques,
                    valid: payload.valid,
                    modal: null,
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
        case RESET_ENTITY:
            return {
                ...state,
                entity: {
                    values: {},
                    id: null,
                    attributes: payload.entityAttributes,
                    uniques: {},
                    valid: false,
                    editing: false,
                },
            }
        case SET_PANEL:
            return {
                ...state,
                panel: {
                    program: payload.programId,
                    programStage: payload.programStageId,
                    organism: payload.organism,
                    sampleDate: payload.sampleDate,
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
        default:
            return state
    }
}

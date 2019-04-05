import { useReducer } from 'react'

const types = {
    SET_PANEL: 0,
    RESET_PANEL: 1,
    SET_VALUE: 2,
    SET_DATAELEMENTS: 3
}

const reducer = (state, action) => {
    console.log(action)
    switch (action.type) {
        case types.SET_PANEL: {
            return {
                ...state,
                organisms: action.organisms,
                programId: action.programId,
                programStageId: action.programStageId,
                organism: action.organism,
                resetSwitch: action.resetSwitch
            }
        }
        case types.RESET_PANEL: {
            return {
                ...state,
                organisms: null,
                programId: '',
                programStageId: '',
                organism: '',
                resetSwitch: !state.resetSwitch
            }
        }
        case types.SET_VALUE: {
            return {
                ...state,
                [action.key]: action.value
            }
        }
        case types.SET_DATAELEMENTS: {
            return {
                ...state,
                dataElements: action.dataElements
            }
        }
        default: {
            return state
        }
    }
}

export const hook = resetSwitch => {
    const [state, dispatch] = useReducer(reducer, {
        organisms: null,
        programId: '',
        programStageId: '',
        organism: '',
        resetSwitch: resetSwitch,
        dataElements: []
    })
    return [state, dispatch, types]
}
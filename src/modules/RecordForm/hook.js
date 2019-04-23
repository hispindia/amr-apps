import { useReducer } from 'react'
import { _sampleIdElementId } from 'api'

const sampleDateError =
    'A different record exists for the same person, with the same organism and lab sample ID, within 15 days'

const types = {
    LOADING: 0,
    SET: 1,
    SET_ERROR: 2,
}

const reducer = (state, action) => {
    switch (action.type) {
        case types.SET: {
            return {
                ...state,
                programStage: action.programStage,
                values: action.values,
                loading: false,
            }
        }
        case types.LOADING: {
            return {
                ...state,
                loading: true,
            }
        }
        case types.SET_ERROR: {
            return {
                ...state,
                errors: {
                    [_sampleIdElementId]: action.error ? sampleDateError : null,
                },
            }
        }
        default: {
            return state
        }
    }
}

export const hook = () => {
    const [state, dispatch] = useReducer(reducer, {
        loading: true,
        programStage: null,
        values: null,
        errors: { [_sampleIdElementId]: null },
    })

    return [state, dispatch, types]
}

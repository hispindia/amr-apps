import { useReducer } from 'react'
import { types } from './constants'

const reducer = (state, action) => {
    switch (action.type) {
        case types.VALUE_PROP: {
            return {
                ...state,
                value: action.value,
                hashedValue: action.value,
            }
        }
        case types.SET_VALUE: {
            return {
                ...state,
                value: action.value,
            }
        }
        case types.SET_ERROR: {
            return {
                ...state,
                error: action.error,
            }
        }
        case types.SET_VALIDATING: {
            return {
                ...state,
                validating: action.validating,
            }
        }
        default: {
            return state
        }
    }
}

export const useValues = () =>
    useReducer(reducer, {
        value: '',
        validating: false,
        error: null,
    })

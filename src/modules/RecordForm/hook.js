import { useReducer } from 'react'

const types = {
    LOADING: 0,
    SET: 1,
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
    })

    return [state, dispatch, types]
}

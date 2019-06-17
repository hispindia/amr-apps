import { useReducer } from 'react'

const types = {
    NEW_PROGRAMS: 0,
    LOADING: 1,
    NEW_ROWS: 2,
    EVENTS_ERRORED: 3,
}

const reducer = (state, action) => {
    switch (action.type) {
        case types.NEW_PROGRAMS: {
            return {
                ...state,
                addButtonDisabled: action.disable,
            }
        }
        case types.LOADING: {
            return {
                ...state,
                loading: true,
            }
        }
        case types.NEW_ROWS: {
            return {
                ...state,
                rows: action.rows,
                loading: false,
            }
        }
        case types.EVENTS_ERRORED: {
            return {
                ...state,
                rows: action.rows,
                error: true,
            }
        }
        default: {
            return state
        }
    }
}

export const hook = () => {
    const [state, dispatch] = useReducer(reducer, {
        rows: null,
        loading: true,
        addButtonDisabled: true,
        error: false,
    })

    return [state, dispatch, types]
}

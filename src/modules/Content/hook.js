import { useReducer } from 'react'

const types = {
    INIT: 0,
    SELECTED: 1,
}

const reducer = (state, action) => {
    switch (action.type) {
        case types.INIT: {
            return {
                ...state,
                metadata: action.metadata,
                selected: action.selected,
            }
        }
        case types.SELECTED: {
            return {
                ...state,
                selected: action.selected,
            }
        }
        default: {
            return state
        }
    }
}

export const hook = () => {
    const [state, dispatch] = useReducer(reducer, {
        metadata: null,
        selected: null,
    })

    return [state, dispatch, types]
}

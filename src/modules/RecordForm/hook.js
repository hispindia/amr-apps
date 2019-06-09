import { useReducer, useContext } from 'react'
import { useSelector } from 'react-redux'
import { _sampleIdElementId, updateEventValue } from 'api'
import { RecordContext } from 'contexts'
import { checkRules } from './checkRules'

const types = {
    LOADING: 0,
    INIT: 1,
    SET_VALUE: 2,
}

const reducer = (state, action) => {
    switch (action.type) {
        case types.INIT: {
            const { values, stage } = checkRules(
                action.values,
                action.programStage,
                {
                    rules: state.rules,
                    optionSets: state.optionSets,
                    pushChanges: !action.completed,
                    updateValue: (name, value) =>
                        updateEventValue(state.eventId, name, value),
                }
            )
            return {
                ...state,
                programStage: stage,
                values: values,
                runRules: !state.runRules,
                loading: false,
                completed: action.completed,
            }
        }
        case types.SET_VALUE: {
            if (state.values[action.name] === action.value) return state
            updateEventValue(state.eventId, action.name, action.value)
            const { values, stage } = checkRules(
                { ...state.values, [action.name]: action.value },
                { ...state.programStage },
                {
                    rules: state.rules,
                    optionSets: state.optionSets,
                    pushChanges: !state.completed,
                    updateValue: (name, value) =>
                        updateEventValue(state.eventId, name, value),
                }
            )
            return {
                ...state,
                values: values,
                programStage: stage,
                runRules: !state.runRules,
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
    const optionSets = useSelector(state => state.metadata.optionSets)

    const { rules, eventId } = useContext(RecordContext)
    const [state, dispatch] = useReducer(reducer, {
        loading: true,
        programStage: null,
        values: null,
        runRules: null,
        optionSets: optionSets,
        rules: rules,
        eventId: eventId,
        completed: true,
    })

    return [state, dispatch, types]
}

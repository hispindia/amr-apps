import { useReducer, useContext } from 'react'
import { _sampleIdElementId, updateEventValue } from 'api'
import { MetadataContext, RecordContext } from 'contexts'
import { checkRules } from './checkRules'

const sampleDateError = days =>
    `A different record exists for the same person, with the same organism and lab sample ID, within ${days} ${
        days > 1 ? 'days' : 'day'
    }`

const types = {
    LOADING: 0,
    INIT: 1,
    SET_VALUE: 2,
    SET_ERROR: 3,
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
        case types.SET_ERROR: {
            return {
                ...state,
                errors: {
                    [_sampleIdElementId]: action.error
                        ? sampleDateError(state.days)
                        : null,
                },
            }
        }
        default: {
            return state
        }
    }
}

export const hook = () => {
    const { constants, optionSets } = useContext(MetadataContext)
    const { rules, eventId } = useContext(RecordContext)
    const [state, dispatch] = useReducer(reducer, {
        loading: true,
        programStage: null,
        values: null,
        errors: { [_sampleIdElementId]: null },
        days: constants.days,
        runRules: null,
        optionSets: optionSets,
        rules: rules,
        eventId: eventId,
        completed: true,
    })

    return [state, dispatch, types]
}

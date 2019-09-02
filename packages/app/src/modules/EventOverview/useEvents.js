import { useEffect, useReducer } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getEvents } from 'api'
import { showAlert } from 'actions/alert'

const INITIAL_STATE = {
    rows: null,
    loading: true,
    addButtonDisabled: true,
    error: false,
}

const NEW_PROGRAMS = 'NEW_PROGRAMS'
const LOADING = 'LOADING'
const NEW_ROWS = 'NEW_ROWS'
const EVENTS_ERRORED = 'EVENTS_ERRORED'

const reducer = (state, action) => {
    switch (action.type) {
        case NEW_PROGRAMS: {
            return {
                ...state,
                addButtonDisabled: action.disable,
            }
        }
        case LOADING: {
            return {
                ...state,
                loading: true,
            }
        }
        case NEW_ROWS: {
            return {
                ...state,
                rows: action.rows,
                loading: false,
            }
        }
        case EVENTS_ERRORED: {
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

export const useEvents = status => {
    const dispatch = useDispatch()
    const categories = useSelector(state => state.appConfig.categories)
    const programList = useSelector(state => state.metadata.programList)
    const user = useSelector(state => state.metadata.user)
    const selected = useSelector(state => state.selectedOrgUnit.id)

    const [state, dispatcher] = useReducer(reducer, INITIAL_STATE)

    useEffect(() => {
        const noProgram = !programList.find(p => p.orgUnits.includes(selected))
        if (noProgram !== state.addButtonDisabled)
            dispatcher({ type: NEW_PROGRAMS, disable: noProgram })
    }, [selected])

    useEffect(() => {
        const getData = async () => {
            try {
                const events = await getEvents(
                    categories.find(c => c.status === status),
                    selected,
                    user.username
                )
                dispatcher({
                    type: NEW_ROWS,
                    rows: events,
                })
            } catch (error) {
                console.error(error)
                dispatcher({ type: EVENTS_ERRORED })
                dispatch(showAlert('Failed to get records', { critical: true }))
            }
        }

        dispatcher({ type: LOADING })
        getData()
    }, [selected, status])

    return state
}

import { createAction } from '../createAction'
import { SET_ALERT, REMOVE_ALERT } from '../types'

export const showAlert = (
    content,
    {
        success = false,
        warning = false,
        critical = false,
        permanent = false,
    } = {}
) => dispatch =>
    dispatch(
        createAction(SET_ALERT, {
            content,
            success,
            warning,
            critical,
            permanent,
        })
    )

export const removeAlert = () => dispatch =>
    dispatch(createAction(REMOVE_ALERT))

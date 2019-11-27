import { createAction } from './createAction'
import { ADD_ALERT, REMOVE_ALERT } from './types'

export const showAlert = (
    content,
    {
        success = false,
        warning = false,
        critical = false,
        permanent = false,
        actions = null,
    } = {}
) => dispatch =>
    dispatch(
        createAction(ADD_ALERT, {
            content,
            success,
            warning,
            critical,
            permanent,
            actions,
        })
    )

export const removeAlert = id => dispatch =>
    dispatch(createAction(REMOVE_ALERT, id))

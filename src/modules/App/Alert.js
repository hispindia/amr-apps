import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AlertBar, AlertStack } from '@dhis2/ui-core'
import { removeAlert } from 'actions/alert'

export const Alert = () => {
    const dispatch = useDispatch()
    const alert = useSelector(state => state.alert)

    const onHidden = () => dispatch(removeAlert())

    if (!alert) return null

    return (
        <AlertStack>
            {[
                <AlertBar
                    success={alert.success}
                    warning={alert.warning}
                    critical={alert.critical}
                    permanent={alert.permanent}
                    key={alert.content}
                    onHidden={onHidden}
                >
                    {alert.content}
                </AlertBar>,
            ]}
        </AlertStack>
    )
}

import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AlertBar, AlertStack } from '@dhis2/ui-core'
import { removeAlert } from 'actions/alert'

export const Alerts = () => {
    const dispatch = useDispatch()
    const alerts = useSelector(state => state.alert.alerts)

    const onHidden = id => dispatch(removeAlert(id))

    if (!alerts) return null

    return (
        <AlertStack>
            {alerts.map(
                ({
                    content,
                    id,
                    success,
                    warning,
                    critical,
                    permanent,
                    actions,
                }) => (
                    <AlertBar
                        key={id}
                        success={success}
                        warning={warning}
                        critical={critical}
                        permanent={permanent}
                        onHidden={() => onHidden(id)}
                        actions={actions}
                    >
                        {content}
                    </AlertBar>
                )
            )}
        </AlertStack>
    )
}

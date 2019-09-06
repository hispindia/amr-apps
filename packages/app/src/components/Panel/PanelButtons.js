import React from 'react'
import { useDispatch } from 'react-redux'
import { ButtonRow } from 'components'
import { resetPanel } from 'actions'

/**
 * Contains event panel.
 */
export const PanelButtons = () => {
    const dispatch = useDispatch()

    const onReset = () => dispatch(resetPanel())

    const buttons = [
        {
            label: 'Reset',
            onClick: onReset,
            icon: 'clear',
            tooltip: 'Reset',
            kind: 'secondary',
            small: true,
        },
    ]

    return <ButtonRow buttons={buttons} />
}

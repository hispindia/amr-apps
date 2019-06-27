import React from 'react'
import { useDispatch } from 'react-redux'
import styled from 'styled-components'
import { ButtonRow } from 'components'
import { resetPanel } from 'actions'

const StyledButtonRow = styled(ButtonRow)`
    position: absolute;
    top: 38px;
    right: 32px;
`

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

    return <StyledButtonRow buttons={buttons} />
}

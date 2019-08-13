import React from 'react'
import { useDispatch } from 'react-redux'
import styled from 'styled-components'
import { ButtonRow } from 'components'
import { setEditing, resetEntity } from 'actions'

export const StyledButtonRow = styled(ButtonRow)`
    position: absolute;
    top: 38px;
    right: 32px;
`

export const EntityButtons = () => {
    const dispatch = useDispatch()

    const onEditClick = () => dispatch(setEditing())

    const reset = () => dispatch(resetEntity())

    return (
        <StyledButtonRow
            buttons={[
                {
                    label: 'Edit',
                    onClick: onEditClick,
                    icon: 'edit',
                    tooltip: 'Edit',
                    kind: 'secondary',
                    small: true,
                },
                {
                    label: 'Reset',
                    onClick: reset,
                    icon: 'clear',
                    tooltip: 'Reset',
                    kind: 'secondary',
                    small: true,
                },
            ]}
        />
    )
}

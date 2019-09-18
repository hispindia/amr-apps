import React from 'react'
import { useDispatch } from 'react-redux'
import { ButtonRow, setEditing, resetEntity } from '@hisp-amr/app'

export const EntityButtons = () => {
    const dispatch = useDispatch()

    const onEditClick = () => dispatch(setEditing())

    const reset = () => dispatch(resetEntity())

    const buttons = [
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
    ]

    return <ButtonRow buttons={buttons} />
}

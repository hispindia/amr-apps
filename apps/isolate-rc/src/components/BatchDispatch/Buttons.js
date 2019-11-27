import React from 'react'
import { bool, func } from 'prop-types'
import { ButtonRow } from '@hisp-amr/app'

export const Buttons = ({ disabled, loading, onCancel, onSubmit }) => {
    const cancelButton = {
        label: 'Cancel',
        onClick: onCancel,
        disabled: loading,
        icon: 'clear',
        secondary: true,
        tooltip: 'Cancel',
    }

    const submitButton = {
        label: 'Dispatch',
        onClick: onSubmit,
        disabled: loading || disabled,
        icon: 'done',
        primary: true,
        tooltip: disabled ? 'A required value is missing' : 'Dispatch batch',
        loading: loading,
    }

    return <ButtonRow buttons={[cancelButton, submitButton]} />
}

Buttons.propTypes = {
    disabled: bool,
    loading: bool,
    onCancel: func.isRequired,
    onSubmit: func.isRequired,
}

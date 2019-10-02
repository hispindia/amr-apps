import React from 'react'
import { bool, func } from 'prop-types'
import { ButtonRow } from '@hisp-amr/app'

export const BatchButtons = ({ disabled, loading, onCancel, onSubmit }) => {
    const cancelButton = {
        label: 'Cancel',
        onClick: onCancel,
        disabled: loading,
        icon: 'clear',
        secondary: true,
        tooltip: 'Cancel',
    }

    const submitButton = {
        label: 'Submit',
        onClick: onSubmit,
        disabled: loading || disabled,
        icon: 'done',
        primary: true,
        tooltip: disabled ? 'A required value is missing' : 'Submit batch',
        loading: loading,
    }

    return <ButtonRow buttons={[cancelButton, submitButton]} />
}

BatchButtons.propTypes = {
    disabled: bool,
    loading: bool,
    onCancel: func.isRequired,
    onSubmit: func.isRequired,
}

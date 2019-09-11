import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import styled from 'styled-components'
import { ButtonRow, submitEvent, setDeletePrompt } from '@amr/app'

const StyledButtonRow = styled(ButtonRow)`
    margin: 0px;
`

export const Buttons = ({ history }) => {
    const dispatch = useDispatch()
    const disabled = useSelector(state => state.data.buttonsDisabled)
    const exit = useSelector(state => state.data.exit)
    const loading = useSelector(state => state.data.buttonLoading)

    useEffect(() => {
        if (exit) history.goBack()
    }, [exit, history])

    const onSubmit = async () => await dispatch(submitEvent())

    const onDelete = () => dispatch(setDeletePrompt(true))

    const deleteButton = {
        label: 'Delete',
        onClick: onDelete,
        disabled: disabled,
        icon: 'delete',
        destructive: true,
        tooltip: 'Permanently delete isolate',
    }

    const submitButton = {
        label: 'Submit',
        onClick: onSubmit,
        disabled: disabled,
        icon: 'done',
        primary: true,
        tooltip: 'Submit record',
        loading: loading === 'submit',
    }

    return <StyledButtonRow buttons={[deleteButton, submitButton]} />
}

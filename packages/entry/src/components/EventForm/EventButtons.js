import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import styled from 'styled-components'
import {
    ButtonRow,
    submitEvent,
    editEvent,
    setDeletePrompt,
    DUPLICATE_ERROR,
} from '@hisp-amr/app'

const StyledButtonRow = styled(ButtonRow)`
    margin: 0px;
`

export const EventButtons = ({ history, existingEvent }) => {
    const dispatch = useDispatch()
    const buttonsDisabled = useSelector(state => state.data.buttonsDisabled)
    const status = useSelector(state => state.data.event.status)
    const eventId = useSelector(state => state.data.event.id)
    const invalid = useSelector(state => state.data.event.invalid)
    const duplicate = useSelector(state => state.data.event.duplicate)
    const exit = useSelector(state => state.data.exit)
    const buttonLoading = useSelector(state => state.data.buttonLoading)

    useEffect(() => {
        if (exit) history.goBack()
    }, [exit, history])

    const onSubmit = async addMore => await dispatch(submitEvent(addMore))

    const submitExit = async () => await onSubmit(false)

    const submitAdd = async () => await onSubmit(true)

    const onEdit = () => dispatch(editEvent())

    const onDelete = () => dispatch(setDeletePrompt(true))

    const deleteButton = {
        label: 'Delete',
        onClick: onDelete,
        disabled: buttonsDisabled || !status.deletable,
        icon: 'delete',
        destructive: true,
        tooltip: 'Permanently delete record',
        disabledTooltip: 'You cannot delete records with an approval status',
    }

    const editButton = {
        label: 'Edit',
        onClick: onEdit,
        disabled: buttonsDisabled || !status.editable,
        icon: 'edit',
        primary: true,
        tooltip: 'Edit record',
        disabledTooltip: 'Records with this approval status cannot be edited',
        loading: buttonLoading === 'edit',
    }

    const submitAddButton = {
        label: 'Submit and add new',
        onClick: submitAdd,
        disabled: buttonsDisabled || !!invalid,
        icon: 'add',
        primary: true,
        tooltip: 'Submit record and add new record for the same person',
        disabledTooltip:
            duplicate === DUPLICATE_ERROR
                ? DUPLICATE_ERROR
                : invalid
                ? invalid
                : '',
        loading: buttonLoading === 'submitAdd',
    }

    const submitButton = {
        label: 'Submit',
        onClick: submitExit,
        disabled: buttonsDisabled || !!invalid,
        icon: 'done',
        primary: true,
        tooltip: 'Submit record',
        disabledTooltip:
            duplicate === DUPLICATE_ERROR
                ? DUPLICATE_ERROR
                : invalid
                ? invalid
                : '',
        loading: buttonLoading === 'submit',
    }

    const buttons = () =>
        existingEvent
            ? !eventId
                ? []
                : [deleteButton, status.completed ? editButton : submitButton]
            : [submitAddButton, submitButton]

    return <StyledButtonRow buttons={buttons()} />
}

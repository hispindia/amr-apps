import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import styled from 'styled-components'
import { ButtonRow } from 'components'
import { submitEvent, editEvent, setDeletePrompt } from 'actions'
import { ERROR } from '../../constants/duplicacy'

const StyledButtonRow = styled(ButtonRow)`
    margin: 0px;
`

export const EventButtons = ({ history, eventParam }) => {
    const dispatch = useDispatch()
    const buttonsDisabled = useSelector(state => state.data.buttonsDisabled)
    const status = useSelector(state => state.data.event.status)
    const eventId = useSelector(state => state.data.event.id)
    const invalid = useSelector(state => state.data.event.invalid)
    const duplicate = useSelector(state => state.data.event.duplicate)

    const onSubmit = async addMore => {
        await dispatch(submitEvent(addMore))
        if (!addMore) history.goBack()
    }

    const submitAndExit = async () => await onSubmit(false)

    const submitAndAdd = async () => await onSubmit(true)

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
    }

    const submitAndAddButton = {
        label: 'Submit and add new',
        onClick: submitAndAdd,
        disabled: buttonsDisabled || !!invalid,
        icon: 'add',
        primary: true,
        tooltip: 'Submit record and add new record for the same person',
        disabledTooltip: duplicate === ERROR ? ERROR : invalid ? invalid : '',
    }

    const submitButton = {
        label: 'Submit',
        onClick: submitAndExit,
        disabled: buttonsDisabled || !!invalid,
        icon: 'done',
        primary: true,
        tooltip: 'Submit record',
        disabledTooltip: duplicate === ERROR ? ERROR : invalid ? invalid : '',
    }

    const buttons = () =>
        eventParam
            ? !eventId
                ? []
                : [deleteButton, status.completed ? editButton : submitButton]
            : [submitAndAddButton, submitButton]

    return <StyledButtonRow buttons={buttons()} />
}

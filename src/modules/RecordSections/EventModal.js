import React from 'react'
import { useDispatch } from 'react-redux'
import { ModalPopup } from 'modules'
import { onDeleteConfirmed } from '../../actions'

export const EventModal = ({ history }) => {
    const dispatch = useDispatch()

    const onDeleteConfirmation = async confirmed => {
        await dispatch(onDeleteConfirmed(confirmed))
        if (confirmed) history.goBack()
    }

    return (
        <ModalPopup
            heading="Delete record"
            text="Are you sure you want to permanently delete this record?"
            onClick={onDeleteConfirmation}
            label="Delete"
            icon="delete"
            destructive
            deletion
        />
    )
}

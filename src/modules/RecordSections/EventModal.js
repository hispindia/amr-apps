import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { ModalPopup } from 'components'
import { onDeleteConfirmed } from '../../actions'

export const EventModal = ({ history }) => {
    const dispatch = useDispatch()
    const deletePrompt = useSelector(state => state.data.deletePrompt)

    const onDeleteConfirmation = async confirmed => {
        await dispatch(onDeleteConfirmed(confirmed))
        if (confirmed) history.goBack()
    }

    if (!deletePrompt) return null

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

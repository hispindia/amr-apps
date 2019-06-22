import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { ModalPopup } from 'components'
import { SUCCESS, LOADING } from 'constants/statuses'
import { onDeleteConfirmed } from 'actions'

export const EventModal = ({ history }) => {
    const dispatch = useDispatch()
    const deletePrompt = useSelector(state => state.data.deletePrompt)
    const deleteSuccess = deletePrompt === SUCCESS
    const deleting = deletePrompt === LOADING

    useEffect(() => {
        if (deleteSuccess) history.goBack()
    }, [deleteSuccess])

    const onDeleteConfirmation = async confirmed =>
        dispatch(onDeleteConfirmed(confirmed))

    if (!deletePrompt) return null

    return (
        <ModalPopup
            heading="Delete record"
            text="Are you sure you want to permanently delete this record?"
            onClick={onDeleteConfirmation}
            label="Delete"
            icon="delete"
            loading={deleting}
            disabled={deleting}
            destructive
            deletion
        />
    )
}

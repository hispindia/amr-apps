import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { ModalPopup } from 'components'
import { SUCCESS, LOADING } from 'constants/statuses'
import { onDeleteConfirmed } from 'actions'

export const EventModal = ({ history, isIsolate, secondaryAction }) => {
    const dispatch = useDispatch()
    const deletePrompt = useSelector(state => state.data.deletePrompt)
    const deleteSuccess = deletePrompt === SUCCESS
    const deleting = deletePrompt === LOADING

    const type = isIsolate ? 'isolate' : 'record'

    useEffect(() => {
        if (deleteSuccess && history) history.goBack()
    }, [deleteSuccess, history])

    const onDeleteConfirmation = async confirmed =>
        dispatch(onDeleteConfirmed(confirmed, secondaryAction))

    if (!deletePrompt) return null

    return (
        <ModalPopup
            heading={`Delete ${type}`}
            text={`Are you sure you want to permanently delete this ${type}?`}
            label="Delete"
            icon="delete"
            destructive
            onClick={onDeleteConfirmation}
            loading={deleting}
            disabled={deleting}
            secondaryAction={secondaryAction}
        />
    )
}

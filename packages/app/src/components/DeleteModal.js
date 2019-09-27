import React, { useEffect } from 'react'
import { func, oneOf } from 'prop-types'
import { useSelector, useDispatch } from 'react-redux'
import styled from 'styled-components'
import { Modal, ButtonStrip } from '@dhis2/ui-core'
import { onDeleteConfirmed } from 'actions'
import { RichButton } from './RichButton'
import { LOADING, SUCCESS } from 'constants'

const Text = styled.div`
    margin: 8px 0;
    line-height: 24px;
`

export const DeleteModal = ({ secondaryAction, onDeleteSucccess, type }) => {
    const dispatch = useDispatch()

    const deletePrompt = useSelector(state => state.data.deletePrompt)
    const deleteSuccess = deletePrompt === SUCCESS
    const loading = deletePrompt === LOADING

    useEffect(() => {
        if (deleteSuccess) onDeleteSucccess()
    }, [deleteSuccess])

    const title = `Delete ${type}`

    const text = `Are you sure you want to permanently delete this ${type}?`

    const onDeleteConfirmation = async confirmed =>
        dispatch(onDeleteConfirmed(confirmed, secondaryAction))

    if (!deletePrompt || deleteSuccess) return null

    return (
        <Modal open small>
            <Modal.Title>{title}</Modal.Title>
            <Modal.Content>
                <Text>{text}</Text>
            </Modal.Content>
            <Modal.Actions>
                <ButtonStrip end>
                    <RichButton
                        secondary
                        onClick={() => onDeleteConfirmation(false)}
                        icon="clear"
                        label="Cancel"
                        disabled={loading}
                    />
                    <RichButton
                        destructive
                        onClick={() => onDeleteConfirmation(true)}
                        loading={loading}
                        icon="delete"
                        label="Delete"
                        initialFocus
                    />
                </ButtonStrip>
            </Modal.Actions>
        </Modal>
    )
}

DeleteModal.propTypes = {
    secondaryAction: func,
    onDeleteSucccess: func.isRequired,
    type: oneOf(['record', 'isolate']).isRequired,
}

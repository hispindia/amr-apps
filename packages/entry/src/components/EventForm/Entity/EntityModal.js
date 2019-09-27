import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import styled from 'styled-components'
import { Modal, ButtonStrip } from '@dhis2/ui-core'
import { RichButton, removeModal } from '@hisp-amr/app'

const Text = styled.div`
    margin: 8px 0;
    line-height: 24px;
`

export const EntityModal = () => {
    const dispatch = useDispatch()
    const modal = useSelector(state => state.data.entity.modal)

    const onModalClick = getEntity => dispatch(removeModal(getEntity))

    if (!modal) return null

    return (
        <Modal open small>
            <Modal.Title>Person found</Modal.Title>
            <Modal.Content>
                <Text>
                    A person with the same <em>{modal.label}</em> is already
                    registered. Do you want to get this person?
                </Text>
            </Modal.Content>
            <Modal.Actions>
                <ButtonStrip end>
                    <RichButton
                        secondary
                        onClick={() => onModalClick(false)}
                        icon="clear"
                        label="Cancel"
                        disabled={modal.loading}
                    />
                    <RichButton
                        primary
                        onClick={() => onModalClick(true)}
                        loading={modal.loading}
                        icon="person"
                        label="Import"
                        initialFocus
                    />
                </ButtonStrip>
            </Modal.Actions>
        </Modal>
    )
}

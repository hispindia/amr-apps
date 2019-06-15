import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { ModalPopup } from 'components'
import { removeModal } from '../../actions'

export const EntityModal = () => {
    const dispatch = useDispatch()
    const modal = useSelector(state => state.data.entity.modal)

    const onModalClick = getEntity => dispatch(removeModal(getEntity))

    if (!modal) return null

    return (
        <ModalPopup
            heading="Person found"
            text={
                <span>
                    A person with the same <em>{modal.label}</em> is already
                    registered. Do you want to get this person?
                </span>
            }
            label="Import"
            icon="person"
            primary
            onClick={onModalClick}
        />
    )
}

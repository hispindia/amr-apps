import React from 'react'
import { func, arrayOf, string } from 'prop-types'
import { Modal } from '@dhis2/ui-core'
import { ButtonRow } from '@hisp-amr/app'
import { Loader } from '../Loader'
import { useBatch } from './useBatch'
import { EventTable } from './EventTable'

export const UpdateModal = ({
    events,
    batchId,
    received,
    dispatched,
    dispatchStatus,
    close,
}) => {
    const { data, loading, error, mutate } = useBatch(events, {
        batchId,
        received,
        dispatched,
        dispatchStatus,
    })

    return (
        <Modal open large>
            <Modal.Title>{`Batch: ${batchId}`}</Modal.Title>
            {loading ? (
                <Loader />
            ) : error ? null : (
                <Modal.Content>
                    <EventTable data={data} onChange={mutate} />
                </Modal.Content>
            )}
            <Modal.Actions>
                <ButtonRow
                    buttons={[
                        {
                            label: 'Close',
                            onClick: close,
                            icon: 'clear',
                            primary: true,
                            tooltip: 'Close',
                        },
                    ]}
                />
            </Modal.Actions>
        </Modal>
    )
}

UpdateModal.propTypes = {
    events: arrayOf(string).isRequired,
    batchId: string.isRequired,
    received: string.isRequired,
    dispatched: string.isRequired,
    dispatchStatus: string.isRequired,
    close: func.isRequired,
}

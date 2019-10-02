import React, { useRef, useEffect, useState } from 'react'
import styled from 'styled-components'
import { Modal } from '@dhis2/ui-core'
import ReactToPrint from 'react-to-print'
import { PrintContent } from './PrintContent'
import { PrintButtons } from './PrintButtons'
import { useGetBatch } from '../../utils'
import { Loader } from '../Loader'
import { useEventData } from './useEventData'

export const PrintModal = ({ batchId, close }) => {
    const printRef = useRef()

    const { data, loading, error } = useGetBatch(batchId)
    const eventData = useEventData(data)

    return (
        <>
            <Modal open large>
                <Modal.Content>
                    {error ? null : loading || !eventData.data ? (
                        <Loader />
                    ) : (
                        <PrintContent
                            forwardRef={printRef}
                            data={eventData.data}
                        />
                    )}
                </Modal.Content>
                <Modal.Actions>
                    <ReactToPrint
                        trigger={() => (
                            <PrintButtons
                                onCancel={close}
                                disabled={!eventData}
                            />
                        )}
                        content={() => printRef.current}
                    />
                </Modal.Actions>
            </Modal>
        </>
    )
}

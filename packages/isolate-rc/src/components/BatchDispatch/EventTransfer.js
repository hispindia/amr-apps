import React, { useState } from 'react'

export const EventTransfer = ({ data, onEventsChange }) => {
    const events = useState([
        ...data.availableArray.map(e => ({
            label: e.amrid,
            value: e.eventuid,
        })),
        ...data.selectedArray.map(e => ({ label: e.amrid, value: e.eventuid })),
    ])
    const selected = useState(
        ...data.selectedArray.map(e => ({ label: e.amrid, value: e.eventuid }))
    )

    return <TransferList options={events} onChange={onEventsChange} />
}

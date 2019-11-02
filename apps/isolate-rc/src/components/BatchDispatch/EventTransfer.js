import React, { useState, useEffect } from 'react'
import { TransferList } from '@hisp-amr/inputs'

export const EventTransfer = ({ data, onChange }) => {
    const [options] = useState([
        ...data.availableArray.map(e => ({
            label: e.amrid,
            value: e.eventuid,
        })),
        ...data.selectedArray.map(e => ({ label: e.amrid, value: e.eventuid })),
    ])
    const [selected] = useState([...data.selectedArray.map(e => e.eventuid)])

    useEffect(() => {
        onChange(options.filter(e => selected.includes(e.value)))
    }, [])

    return (
        <TransferList
            options={options}
            onChange={onChange}
            selected={selected}
        />
    )
}

import React from 'react'
import { BatchTable } from './BatchTable'
import { toDispatchedBatches } from '../utils/toDispatchedBatches'

const headers = [
    { name: 'Batch' },
    { name: 'AMR IDs' },
    { name: 'Organism group' },
    { name: 'Dispatched' },
    { name: 'Status' },
]

export const DispatchedBatches = () => {
    const onClick = param => console.log(param)

    return (
        <BatchTable
            title="Dispatched sample batches"
            headers={headers}
            onClick={onClick}
            filterBatches={toDispatchedBatches}
        />
    )
}

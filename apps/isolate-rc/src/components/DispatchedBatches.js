import React, { useState } from 'react'
import { BatchTable } from './BatchTable'
import { BatchDispatch } from './BatchDispatch'
import { toDispatchedBatches } from '../utils/toDispatchedBatches'

const headers = [
    { name: 'Batch' },
    { name: 'AMR IDs' },
    { name: 'Organism group' },
    { name: 'Dispatched' },
    { name: 'Status' },
]

export const DispatchedBatches = () => {
    const [batch, setBatch] = useState()

    const onClick = id => {} //setBatch(id[0])

    const onClose = () => {} //setBatch()

    return (
        <>
            {batch && <BatchDispatch batchNo={batch} close={onClose} />}
            <BatchTable
                title="Dispatched sample batches"
                headers={headers}
                filterBatches={toDispatchedBatches}
            />
        </>
    )
}

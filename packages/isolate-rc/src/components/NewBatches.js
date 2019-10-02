import React, { useState } from 'react'
import { RichButton } from '@hisp-amr/app'
import { BatchForm } from './BatchForm'
import { BatchDispatch } from './BatchDispatch'
import { BatchTable } from './BatchTable'
import { toNewBatches, useHasPrograms } from '../utils'

const headers = [
    { name: 'Batch' },
    { name: 'AMR IDs' },
    { name: 'Organism group' },
    { name: 'Created' },
]

export const NewBatches = () => {
    const hasPrograms = useHasPrograms()

    const [newBatch, setNewBatch] = useState(false)
    const [dispatchBatch, setDispatchBatch] = useState()
    const [refetch, setRefetch] = useState(false)

    const onFormClose = success => {
        setNewBatch(false)
        if (success) setRefetch(!refetch)
    }

    const onDispatchClose = success => {
        setDispatchBatch()
        if (success) setRefetch(!refetch)
    }

    const onRowClick = id => setDispatchBatch(id[0])

    const onAddClick = () => setNewBatch(true)

    const tooltip = hasPrograms
        ? 'Add a new batch'
        : 'You cannot add batches from the selected organisation unit'

    return (
        <>
            {newBatch && <BatchForm close={onFormClose} />}
            {dispatchBatch && (
                <BatchDispatch
                    batchNo={dispatchBatch}
                    close={onDispatchClose}
                />
            )}
            <BatchTable
                title="New sample batches"
                headers={headers}
                onClick={onRowClick}
                filterBatches={toNewBatches}
                refetch={refetch}
                button={
                    <div title={tooltip}>
                        <RichButton
                            primary
                            large
                            icon="add"
                            label="Add batch"
                            disabled={!hasPrograms}
                            onClick={onAddClick}
                        />
                    </div>
                }
            />
        </>
    )
}

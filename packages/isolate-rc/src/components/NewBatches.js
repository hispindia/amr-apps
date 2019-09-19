import React, { useState } from 'react'
import { RichButton } from '@hisp-amr/app'
import { BatchForm } from './BatchForm'
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

    const [showForm, setShowForm] = useState(false)

    const onFormCancel = () => setShowForm(false)

    const onRowClick = () => console.log('Row clicked')

    const onAddClick = () => setShowForm(true)

    const tooltip = hasPrograms
        ? 'Add a new batch'
        : 'You cannot add batches from the selected organisation unit'

    return (
        <>
            {showForm && <BatchForm onCancel={onFormCancel} />}
            <BatchTable
                title="New sample batches"
                headers={headers}
                onClick={onRowClick}
                filterBatches={toNewBatches}
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

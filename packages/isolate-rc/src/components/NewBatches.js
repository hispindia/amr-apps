import React, { useState } from 'react'
import { useSelector } from 'react-redux'
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
    const orgUnit = useSelector(state => state.selectedOrgUnit)
    const hasPrograms = useHasPrograms()

    const [showForm, setShowForm] = useState(false)
    const [refetch, setRefetch] = useState(false)

    const onFormClose = success => {
        setShowForm(false)
        if (success) setRefetch(!refetch)
    }

    const onRowClick = () => console.log('Row clicked')

    const onAddClick = () => setShowForm(true)

    const tooltip = hasPrograms
        ? 'Add a new batch'
        : 'You cannot add batches from the selected organisation unit'

    return (
        <>
            {showForm && <BatchForm close={onFormClose} />}
            <BatchTable
                title="New sample batches"
                headers={headers}
                onClick={onRowClick}
                filterBatches={toNewBatches}
                orgUnit={orgUnit ? orgUnit.displayName : ''}
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

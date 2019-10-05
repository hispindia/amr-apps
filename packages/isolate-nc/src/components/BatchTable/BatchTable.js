import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { bool, func } from 'prop-types'
import { LoadingSection, Table } from '@hisp-amr/app'
import { useBatches } from './useBatches'
import { UpdateModal } from '../UpdateModal'
import { UpdateButton } from './UpdateButton'
import { ReceivedDate } from './ReceivedDate'

export const BatchTable = ({ onClick, refetch }) => {
    const orgUnit = useSelector(state => state.selectedOrgUnit)

    const { data, loading, error, mutate } = useBatches(refetch)
    const [update, setUpdate] = useState(false)

    const headers = [
        { name: 'Batch' },
        { name: 'Lab' },
        { name: 'AMR IDs' },
        { name: 'Organism group' },
        {
            name: 'Received',
            options: {
                customBodyRender: (value, tableMeta) => (
                    <ReceivedDate
                        name={`${tableMeta.rowIndex}`}
                        value={data[tableMeta.rowIndex][4]}
                        onChange={onReceivedChange}
                    />
                ),
            },
        },
        {
            name: '',
            options: {
                filter: false,
                sort: false,
                empty: true,
                searchable: false,
                viewColumns: false,
                customBodyRender: (value, tableMeta) => (
                    <UpdateButton
                        onClick={setUpdate}
                        data={data[tableMeta.rowIndex]}
                    />
                ),
            },
        },
    ]

    const onReceivedChange = (index, value) => mutate(index, value)

    const closeUpdate = () => setUpdate(false)

    return (
        <>
            {update && (
                <UpdateModal
                    batchId={update.batchId}
                    events={update.events}
                    received={update.received}
                    dispatched={update.dispatched}
                    dispatchStatus={update.dispatchStatus}
                    close={closeUpdate}
                />
            )}
            {!error &&
                (loading ? (
                    <LoadingSection />
                ) : (
                    <Table
                        title={orgUnit ? orgUnit.displayName : ''}
                        headers={headers}
                        rows={data}
                        onRowClick={onClick}
                    />
                ))}
        </>
    )
}

BatchTable.propTypes = {
    onClick: func,
    refetch: bool,
}

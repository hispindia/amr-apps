import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { string, func, arrayOf, shape, object, node } from 'prop-types'
import { Button } from '@dhis2/ui-core'
import { LoadingSection, Table, TitleRow } from '@hisp-amr/app'
import { useBatches } from './useBatches'
import { PrintModal } from '../PrintModal'
//import './style.css'

export const BatchTable = ({
    title,
    headers,
    onClick,
    filterBatches,
    button,
    refetch,
}) => {
    const orgUnit = useSelector(state => state.selectedOrgUnit)

    const { data, loading, error } = useBatches(filterBatches, refetch)
    const [print, setPrint] = useState(false)

    const printColumn = {
        name: '',
        options: {
            filter: false,
            sort: false,
            empty: true,
            searchable: false,
            viewColumns: false,
            customBodyRender: (value, tableMeta) => (
                <Button
                    small
                    onClick={e => {
                        e.stopPropagation()
                        e.preventDefault()
                        setPrint(data[tableMeta.rowIndex][0])
                    }}
                >
                    Print
                </Button>
            ),
        },
    }

    const closePrint = () => setPrint(false)

    return (
        <>
            <TitleRow title={title} button={button} />
            {print && <PrintModal batchId={print} close={closePrint} />}
            {!error &&
                (loading ? (
                    <LoadingSection />
                ) : (
                    <Table
                        title={orgUnit ? orgUnit.displayName : ''}
                        headers={[...headers, printColumn]}
                        rows={data}
                        onRowClick={onClick}
                    />
                ))}
        </>
    )
}

BatchTable.propTypes = {
    title: string.isRequired,
    headers: arrayOf(shape({ name: string.isRequired, options: object }))
        .isRequired,
    onClick: func.isRequired,
    filterBatches: func.isRequired,
    button: node,
}

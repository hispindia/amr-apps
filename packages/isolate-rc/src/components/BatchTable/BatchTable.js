import React from 'react'
import { string, func, arrayOf, shape, object, node } from 'prop-types'
import { LoadingSection, Table, TitleRow } from '@hisp-amr/app'
import { useBatches } from './useBatches'

export const BatchTable = ({
    title,
    headers,
    onClick,
    filterBatches,
    button,
    orgUnit,
    refetch,
}) => {
    const { data, loading, error } = useBatches(filterBatches, refetch)

    return (
        <>
            <TitleRow title={title} button={button} />
            {!error &&
                (loading ? (
                    <LoadingSection />
                ) : (
                    <Table
                        headers={headers}
                        rows={data}
                        onRowClick={onClick}
                        title={orgUnit}
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
    orgUnit: string,
}

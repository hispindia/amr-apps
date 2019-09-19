import React from 'react'
import { string, func, arrayOf, shape, object, node } from 'prop-types'
import { LoadingSection, Table, TitleRow } from '@hisp-amr/app'
import { useBatches } from '../utils'

export const BatchTable = ({
    title,
    headers,
    onClick,
    filterBatches,
    button,
}) => {
    const { data, loading, error } = useBatches(filterBatches)

    return (
        <>
            <TitleRow title={title} button={button} />
            {!error &&
                (loading ? (
                    <LoadingSection />
                ) : (
                    <Table headers={headers} rows={data} onRowClick={onClick} />
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

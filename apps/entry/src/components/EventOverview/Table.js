import React from 'react'
import { arrayOf, func, object, shape, string } from 'prop-types'
import styled from 'styled-components'
import { Card } from '@dhis2/ui-core'
import MUIDataTable from 'mui-datatables'

const StyledCard = styled(Card)`
    height: unset !important;
`

/**
 * Table containg the persons events.
 */
export const Table = ({ title, rows, headers, onEventClick }) => (
    <StyledCard>
        <MUIDataTable
            title={title}
            data={rows}
            columns={headers}
            options={{
                selectableRows: 'none',
                elevation: 0,
                onRowClick: onEventClick,
                responsive: 'stacked',
            }}
        />
    </StyledCard>
)

Table.propTypes = {
    title: string,
    onEventClick: func.isRequired,
    rows: arrayOf(arrayOf(string)).isRequired,
    headers: arrayOf(
        shape({
            name: string.isRequired,
            options: object,
        })
    ).isRequired,
}

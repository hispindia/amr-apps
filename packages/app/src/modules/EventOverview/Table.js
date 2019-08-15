import React from 'react'
import { arrayOf, bool, func, object, shape, string } from 'prop-types'
import styled from 'styled-components'
import { Card } from '@dhis2/ui-core'
import MUIDataTable from 'mui-datatables'
import TableToolbar from './TableToolbar'

const StyledCard = styled(Card)`
    height: unset !important;
`

/**
 * Table containg the persons events.
 */
export const Table = ({
    rows,
    headers,
    onEventClick,
    addButton,
    onAddClick,
    addButtonDisabled,
}) => {
    const toolbar = () =>
        addButton && (
            <TableToolbar
                onAddClick={onAddClick}
                addButtonDisabled={addButtonDisabled}
            />
        )

    return (
        <StyledCard>
            <MUIDataTable
                title=""
                data={rows}
                columns={headers}
                options={{
                    selectableRows: 'none',
                    elevation: 0,
                    onRowClick: onEventClick,
                    customToolbar: toolbar,
                }}
            />
        </StyledCard>
    )
}

Table.propTypes = {
    onEventClick: func.isRequired,
    onAddClick: func,
    addButtonDisabled: bool,
    rows: arrayOf(arrayOf(string)).isRequired,
    headers: arrayOf(
        shape({
            name: string.isRequired,
            options: object,
        })
    ).isRequired,
}

import React from 'react'
import { Card } from '@dhis2/ui/core'
import MUIDataTable from 'mui-datatables'
import TableToolbar from '../../inputs/TableToolbar'

/**
 * Table containg the persons events (records).
 */
export const RecordTable = props => (
    <MUIDataTable
        title={props.title}
        data={props.data.rows}
        columns={props.data.headers}
        options={{
            selectableRows: false,
            elevation: 0,
            onRowClick: props.onEventClick
                ? row => props.onEventClick(row)
                : () => {},
            customToolbar: () => props.addButton &&
                <TableToolbar
                    onAddClick={props.onAddClick}
                    addButtonDisabled={props.addButtonDisabled}
                />
        }}
    />
)

import React from 'react'
import { Card } from '@dhis2/ui/core'
import MUIDataTable from 'mui-datatables'
import TableToolbar from '../../inputs/TableToolbar'

/**
 * Table containg the persons events (records).
 */
export const RecordTable = props => (
    <Card>
        <MUIDataTable
            title={props.title}
            data={props.data.rows}
            columns={props.data.headers}
            options={{
                selectableRows: false,
                onRowClick: row => props.onEventClick(row),
                elevation: 0,
                customToolbar: () => props.addButton
                    ? <TableToolbar
                        onAddClick={props.onAddClick}
                        addButtonDisabled={props.addButtonDisabled}
                    />
                    : null
            }}
        />
    </Card>
)

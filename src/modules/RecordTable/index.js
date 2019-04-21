import React from 'react'
import { arrayOf, bool, func, object, shape, string } from 'prop-types'
import MUIDataTable from 'mui-datatables'
import TableToolbar from '../../inputs/TableToolbar'

/**
 * Table containg the persons events (records).
 */
export const RecordTable = props => (
    <MUIDataTable
        title=""
        data={props.data.rows}
        columns={props.data.headers}
        options={{
            selectableRows: false,
            elevation: 0,
            onRowClick: props.onEventClick
                ? row => props.onEventClick(row)
                : () => {},
            customToolbar: () =>
                props.addButton && (
                    <TableToolbar
                        onAddClick={props.onAddClick}
                        addButtonDisabled={props.addButtonDisabled}
                    />
                ),
        }}
    />
)

RecordTable.propTypes = {
    onEventClick: func.isRequired,
    onAddClick: func,
    addButtonDisabled: bool,
    data: shape({
        rows: arrayOf(arrayOf(string)).isRequired,
        headers: arrayOf(object).isRequired,
    }).isRequired,
}

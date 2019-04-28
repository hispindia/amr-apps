import React from 'react'
import { arrayOf, bool, func, object, shape, string } from 'prop-types'
import MUIDataTable from 'mui-datatables'
import TableToolbar from '../../inputs/TableToolbar'

/**
 * Table containg the persons events (records).
 */
export const RecordTable = ({
    rows,
    headers,
    onEventClick,
    addButton,
    onAddClick,
    addButtonDisabled,
}) => (
    <MUIDataTable
        title=""
        data={rows}
        columns={headers}
        options={{
            selectableRows: false,
            elevation: 0,
            onRowClick: onEventClick ? row => onEventClick(row) : () => {},
            customToolbar: () =>
                addButton && (
                    <TableToolbar
                        onAddClick={onAddClick}
                        addButtonDisabled={addButtonDisabled}
                    />
                ),
        }}
    />
)

RecordTable.propTypes = {
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

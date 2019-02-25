import React from 'react'
import { Card } from '@dhis2/ui/core'
import MUIDataTable from 'mui-datatables'
import TableToolbar from '../../inputs/TableToolbar'
import { MarginTop } from '../../helpers/helpers'

/**
 * Table containg the persons events (records).
 */
export class EventTable extends React.Component {
    render() {
        return (
            <MarginTop>
                <Card>
                    <MUIDataTable
                        title={this.props.title}
                        data={this.props.data.rows}
                        columns={this.props.data.headers}
                        options={{
                            selectableRows: false,
                            onRowClick: row => this.props.onEventClick(row),
                            elevation: 0,
                            customToolbar: () => {
                                return this.props.addButton ? (
                                    <TableToolbar
                                        onAddClick={this.props.onAddClick}
                                    />
                                ) : null
                            },
                        }}
                    />
                </Card>
            </MarginTop>
        )
    }
}

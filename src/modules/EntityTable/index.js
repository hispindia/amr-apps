import React from 'react'
import { withRouter } from 'react-router-dom'
import { Card } from '@dhis2/ui/core'
import MUIDataTable from 'mui-datatables'
import TableToolbar from '../../inputs/TableToolbar'

/**
 * Table containing all persons belonging to the selected OU or it's descendants.
 */
class EntityTable extends React.Component {
    onClick = row => {
        this.props.history.push(
            'orgUnit/' + this.props.orgUnit + '/entity/' + row[3]
        )
    }

    render() {
        return (
            <Card>
                <MUIDataTable
                    title={''}
                    data={this.props.data.rows}
                    columns={this.props.data.headers}
                    options={{
                        selectableRows: false,
                        onRowClick: this.onClick,
                        elevation: 0,
                        customToolbar: () => {
                            return (
                                <TableToolbar
                                    onAddClick={this.props.onAddClick}
                                />
                            )
                        },
                    }}
                />
            </Card>
        )
    }
}

export default withRouter(EntityTable)

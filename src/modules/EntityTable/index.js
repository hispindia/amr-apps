import React from 'react'
import { Redirect } from 'react-router-dom'
import { Card } from '@dhis2/ui/core'
import MUIDataTable from 'mui-datatables'
import TableToolbar from '../../inputs/TableToolbar'

export class EntityTable extends React.Component {
    state = {
        entityClicked: null,
    }

    onClick = row => {
        this.setState({ entityClicked: row[3] })
    }

    render() {
        if (this.state.entityClicked)
            return <Redirect push to={'/entity/' + this.state.entityClicked} />

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

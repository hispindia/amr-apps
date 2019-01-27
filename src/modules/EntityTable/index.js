import React from 'react'
import { Redirect } from 'react-router-dom'
import { Card } from '@dhis2/ui/core'
import MUIDataTable from 'mui-datatables'

export class EntityTable extends React.Component {
    state = {
        patientClicked: null,
    }

    onClick = row => {
        this.setState({ patientClicked: row[2] })
    }

    render() {
        if (this.state.patientClicked)
            return <Redirect push to={'/entity/' + this.state.patientClicked} />

        return (
            <Card>
                <MUIDataTable
                    title={this.props.data.title}
                    data={this.props.data.rows}
                    columns={this.props.data.headers}
                    options={{
                        selectableRows: false,
                        onRowClick: this.onClick,
                        elevation: 0,
                    }}
                />
            </Card>
        )
    }
}

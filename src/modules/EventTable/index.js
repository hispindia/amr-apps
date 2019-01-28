import React from 'react'
import { Redirect } from 'react-router-dom'
import { Card } from '@dhis2/ui/core'
import MUIDataTable from 'mui-datatables'
import TableToolbar from '../../inputs/TableToolbar'

export class EventTable extends React.Component {
    state = {
        patientClicked: null,
    }

    render() {
        //if(this.state.patientClicked)
        //    return <Redirect push to={"/patient/" + this.state.patientClicked}/>;

        if (this.state.addClicked) return <Redirect push to="/event" />

        return (
            <div style={{ marginTop: 16 }}>
                <Card>
                    <MUIDataTable
                        title={'Records'}
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
            </div>
        )
    }
}

import React from 'react';
import { Redirect } from 'react-router-dom'
import { Card } from '@dhis2/ui/core'
import MUIDataTable from "mui-datatables";


export class EventTable extends React.Component {
    state = {
        patientClicked: null
    };

    onClick = row => {
        console.log('hello')
    }

    render() {
        //if(this.state.patientClicked)
        //    return <Redirect push to={"/patient/" + this.state.patientClicked}/>;

        return (
            <div style={{ marginTop: 16 }}>
                <Card>
                    <MUIDataTable
                        title={"Some title"}
                        data={this.props.data.rows}
                        columns={this.props.data.headers}
                        options={{
                            selectableRows: false,
                            onRowClick: this.onClick,
                            elevation: 0
                        }}
                    />
                </Card>
            </div>
        );
    }
}

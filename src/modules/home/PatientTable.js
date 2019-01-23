import React from 'react';
import { Redirect } from 'react-router-dom'
import { Card } from '@dhis2/ui/core'
import MUIDataTable from "mui-datatables";


export class PatientTable extends React.Component {
    state = {
        patientClicked: null
    };

    onClick = row => {
        this.setState({ patientClicked: row[7] });
    }

    render() {
        if(this.state.patientClicked)
            return <Redirect push to={"/patient/" + this.state.patientClicked}/>;

        return (
            <Card>
                <MUIDataTable
                    title={"Patients"}
                    data={this.props.data.rows}
                    columns={this.props.data.headers}
                    options={{
                        selectableRows: false,
                        onRowClick: this.onClick,
                        elevation: 0
                    }}
                />
            </Card>
        );
    }
}

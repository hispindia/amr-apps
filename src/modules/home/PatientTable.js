import React from 'react';
import { Redirect } from 'react-router-dom'
import MUIDataTable from "mui-datatables";


/**
 * Table with the most recently updates OU's.
 */
export class PatientTable extends React.Component {
    state = {
        patientClicked: null
    };

    /**
     * Redirects to the details page of the OU clicked.
     * @param {String} id OU id
     */
    onClick = row => {
        console.log(row)
        this.setState({ patientClicked: row[7] });
    }

    render() {
        if(this.state.patientClicked)
            return <Redirect push to={"/patient/" + this.state.patientClicked}/>;

        return (
            <MUIDataTable
                title={"Patients"}
                data={this.props.data.rows}
                columns={this.props.data.headers}
                options={{
                    selectableRows: false,
                    onRowClick: this.onClick
                }}
            />
        );
    }
}

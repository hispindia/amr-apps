import React, { Component } from 'react';
import InputField from '../../components/InputField';
import { getPatient } from '../../api/api';
import { Paper } from '@material-ui/core';
//import MomentUtils from "@date-io/moment";
//import { InputField } from '@dhis2/ui/core/InputField'


export class DataEntry extends Component {
    state = { value: '' }

    searchPatient = async value => {
        const patientData = await getPatient(value);
        if(patientData)
            this.setState({
                dateOfBirth: patientData.
            });
    }

    /*onChange = (name, value) => {
        //console.log(event)
        this.setState({ value: value })
    }*/

    /*
    <TextField
                required={this.props.required}
                id="standard-required"
                name={this.props.name}
                label={this.props.displayName}
                onChange={this.props.onChange}
                value={this.state.value}
            />
    */

    render() {

        return (
            <Paper style={{ padding: 16 }}>
                <InputField
                    required = { true }
                    name = { 'patientRegistrationNumber' }
                    label = { 'Patient registration number' }
                    value = { this.state.patientRegistrationNumber }
                    onChange = { this.searchPatient }
                />
                <InputField
                    required = { true }
                    name = { 'dateOfBirth' }
                    label = { 'Date of birth' }
                    value = { this.state.dateOfBirth }
                    onChange = { this.onChange }
                />
            </Paper>
        );
    }
}

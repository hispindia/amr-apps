import React, { Component } from 'react';
import { Paper, Typography } from '@material-ui/core';
import { getPatient } from '../../api/api';
import { InputField } from '../../components/InputField';
import { DateField } from '../../components/DateField';
//import MomentUtils from "@date-io/moment";
//import { InputField } from '@dhis2/ui/core/InputField'


export class PatientInformation extends Component {
    state = {
        city: '',
        dateOfBirth: '',
        district: '',
        gender: '',
        locationType: '',
        patientRegistrationNumber: '',
        state: ''
    }

    searchPatient = async value => {
        const patientData = await getPatient(value);
        console.log(patientData);
        if(patientData) {
            this.setState(patientData);
            //this.setState({ dateOfBirth: patientData.dateOfBirth })
        }
    }

    onChange = (name, value) => {
        //console.log(event)
        //this.setState({ name: value })
    }

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
        const {
            patientRegistrationNumber,
            dateOfBirth,
            gender,
            state,
            district,
            city,
            locationType
        } = this.state;

        console.log(this.state)
        return (
            <Paper style={{ padding: 16 }}>
                <Typography variant="h6" component="h6" style={{ padding: "30px 30px 10px 30px" }}>
                    Patient information
                </Typography>
                <InputField
                    required = { true }
                    name = { 'patientRegistrationNumber' }
                    label = { 'Patient registration number' }
                    value = { patientRegistrationNumber }
                    onChange = { this.searchPatient }
                />
                <DateField
                    required = { true }
                    name = { 'dateOfBirth' }
                    label = { 'Date of birth' }
                    value = { dateOfBirth }
                    onChange = { this.onChange }
                />
                <InputField
                    required = { true }
                    name = { 'gender' }
                    label = { 'Gender' }
                    value = { gender }
                    onChange = { this.onChange }
                />
                <InputField
                    required = { true }
                    name = { 'state' }
                    label = { 'State' }
                    value = { state }
                    onChange = { this.onChange }
                />
                <InputField
                    required = { true }
                    name = { 'district' }
                    label = { 'District' }
                    value = { district }
                    onChange = { this.onChange }
                />
                <InputField
                    required = { false }
                    name = { 'city' }
                    label = { 'City/Town/Village' }
                    value = { city }
                    onChange = { this.onChange }
                />
                <InputField
                    required = { false }
                    name = { 'locationType' }
                    label = { 'Location Type' }
                    value = { locationType }
                    onChange = { this.onChange }
                />
            </Paper>
        );
    }
}

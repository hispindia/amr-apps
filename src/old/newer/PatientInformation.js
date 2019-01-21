import React, { Component } from 'react';
import { Paper, Typography, Grid, Button } from '@material-ui/core';
import DoneIcon from '@material-ui/icons/Done';
import { getPatient, getStates, getDistricts } from '../../api/api';
import { InputField } from '../../components/InputField';
import { DateField } from '../../components/DateField';
import { RadioSelector } from '../../components/RadioSelector';
import { ObjectSelect } from '../../components/ObjectSelect';


export class PatientInformation extends Component {
    state = {
        city: '',
        dateOfBirth: '',
        district: '',
        gender: '',
        locationType: '',
        patientRegistrationNumber: '',
        state: '',
        loading: true
    }

    componentDidMount = async () => {
        console.log(await getStates())
        this.setState({
            states: await getStates(),
            districts: []
        });

        if(this.props.match.params.id)
            await this.searchPatient(this.props.match.params.id);

        this.setState({ loading: false });
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
        console.log(name)
        console.log(value)
        //this.setState({ name: value })
    }
    
    onStateSelected = async value => {
        this.setState({
            state: value,
            districts: await getDistricts(value)
        });
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
            locationType,
            states,
            districts,
            loading
        } = this.state;

        console.log(this.state)

        if(loading) return null;

        return (
            <Paper style={{ padding: "20px 34px 20px 20px" }}>
                <Typography variant="h6" component="h6" style={{ padding: 6 }}>
                    Patient information
                </Typography>
                <Grid container spacing={16} direction='row'>
                    <Grid item xs>
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
                        <RadioSelector
                            required = { true }
                            objects = { ['Male', 'Female', 'Transgender'] }
                            name = { 'gender' }
                            label = { 'Gender' }
                            value = { gender }
                            onChange = { this.onChange }
                        />
                    </Grid>
                    <Grid item xs>
                        <ObjectSelect
                            required = { true }
                            objects = { states }
                            label = { 'State' }
                            value = { state }
                            labelWidth = { 47 }
                            onChange = { this.onStateSelected }
                        />
                        <ObjectSelect
                            required = { true }
                            objects = { districts }
                            label = { 'District' }
                            value = { district }
                            labelWidth = { 60 }
                            disabled = { state === '' || districts.length === 0 }
                            helperText = 'Select state first'
                        />
                        <InputField
                            required = { false }
                            name = { 'city' }
                            label = { 'City/Town/Village' }
                            value = { city }
                            onChange = { this.onChange }
                        />
                        <RadioSelector
                            required = { false }
                            objects = { ['Urban', 'Rural'] }
                            name = { 'locationType' }
                            label = { 'Location type' }
                            value = { locationType }
                            onChange = { this.onChange }
                        />
                    </Grid>
                </Grid>
                <Button variant="contained" color="primary">
                            <DoneIcon style={{paddingRight: 8}}/>
                            Submit
                        </Button>
            </Paper>
        );
    }
}

import React, { Component } from 'react';
import { Paper, Typography, Grid, Button } from '@material-ui/core';
import DoneIcon from '@material-ui/icons/Done';
import { getPatient, getStates, getDistricts, getProgramAttributes } from '../../api/api';
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
        loading: true,
        values: {}
    }

    componentDidMount = async () => {
        //console.log(await getStates())
        const programAttributes = await getProgramAttributes();
        console.log(programAttributes)
        let values = {};
        for(let i = 0; i < programAttributes.length; i++)
            values[programAttributes[i].trackedEntityAttribute.id] = '';


        this.setState({
            states: await getStates(),
            districts: [],
            attributes: programAttributes,
            values: values
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
        let values = {...this.state.values};
        values[name] = value;
        this.setState({ values: values })
    }
    
    onStateSelected = async value => {
        this.console.log(value)
        this.setState({
            state: value,
            //districts: await getDistricts(value)
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
            loading,
            attributes,
            values
        } = this.state;

        console.log(this.state)

        if(loading) return null;

        return (
            <Paper style={{ padding: "20px 34px 20px 20px" }}>
                <Typography variant="h6" component="h6" style={{ padding: "8px 8px 20px 8px" }}>
                    Patient information
                </Typography>
                <Grid container spacing={16} direction='column'>
                    {attributes.map(attribute => (
                        <Grid item md key={attribute.trackedEntityAttribute.id}>
                            {attribute.trackedEntityAttribute.valueType === 'AGE' ? (
                                <DateField
                                    required = { true }
                                    name = { attribute.trackedEntityAttribute.id }
                                    label = { attribute.trackedEntityAttribute.displayName }
                                    value = { values[attribute.trackedEntityAttribute.id] }
                                    onChange = { this.onChange }
                            />
                            ) : attribute.trackedEntityAttribute.optionSetValue ? (
                                    attribute.trackedEntityAttribute.optionSet.options.length < 5 ? (
                                        <RadioSelector
                                            required = { true }
                                            objects = { attribute.trackedEntityAttribute.optionSet.options }
                                            name = { attribute.trackedEntityAttribute.id }
                                            label = { attribute.trackedEntityAttribute.displayName }
                                            value = { values[attribute.trackedEntityAttribute.id] }
                                            onChange = { this.onChange }
                                        />
                                    ) : (
                                        <ObjectSelect
                                            required = { true }
                                            objects = { attribute.trackedEntityAttribute.optionSet.options }
                                            label = { attribute.trackedEntityAttribute.displayName }
                                            value = { values[attribute.trackedEntityAttribute.id] }
                                            labelWidth = { 60 }
                                            onChange = { this.onStateSelected }
                                        />)
                            ) : <InputField
                                    required = { true }
                                    name = { attribute.trackedEntityAttribute.id }
                                    label = { attribute.trackedEntityAttribute.displayName }
                                    value = { values[attribute.trackedEntityAttribute.id] }
                                    onChange = { this.onChange }
                                />
                            }
                        </Grid>
                    ))}
                </Grid>
                <Button variant="contained" color="primary" style={{ margin: 8 }}>
                    <DoneIcon style={{paddingRight: 8}}/>
                    Submit
                </Button>
            </Paper>
        );
    }
}

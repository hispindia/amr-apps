import React, { Component } from 'react';
import { Paper, Typography, Grid, Button } from '@material-ui/core';
import DoneIcon from '@material-ui/icons/Done';
import { /*getPatient,*/ getProgramAttributes, getDistricts } from '../../api/api';
import { InputField } from '../../components/InputField';
import { DateField } from '../../components/DateField';
import { RadioSelector } from '../../components/RadioSelector';
import { ObjectSelect } from '../../components/ObjectSelect';


export class PatientInformation extends Component {
    state = {
        loading: true,
        values: {},
        stateId: '',
        districts: []
    }

    componentDidMount = async () => {
        const programAttributes = await getProgramAttributes();
        let values = {};
        let stateId = '';
        for(let i = 0; i < programAttributes.length; i++) {
            values[programAttributes[i].trackedEntityAttribute.id] = '';
            if(programAttributes[i].trackedEntityAttribute.code === 'state')
                stateId = programAttributes[i].trackedEntityAttribute.id;
        }


        this.setState({
            attributes: programAttributes,
            values: values,
            stateId: stateId
        });

        //if(this.props.match.params.id)
        //    await this.searchPatient(this.props.match.params.id);

        this.setState({ loading: false });
    }

    /*searchPatient = async value => {
        const patientData = await getPatient(value);
        console.log(patientData);
        if(patientData) {
            this.setState(patientData);
            //this.setState({ dateOfBirth: patientData.dateOfBirth })
        }
    }*/

    onChange = async (name, value) => {
        let values = {...this.state.values};
        values[name] = value;
        if(name === this.state.stateId)
            this.setState({
                values: values,
                districts: await getDistricts(value)
            })
        else
            this.setState({ values: values })
    }

    render() {
        const {
            loading,
            attributes,
            values,
            districts
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
                                            objects = { attribute.trackedEntityAttribute.code !== 'district' ? (
                                                attribute.trackedEntityAttribute.optionSet.options
                                                ) : districts }
                                            name = { attribute.trackedEntityAttribute.id }
                                            label = { attribute.trackedEntityAttribute.displayName }
                                            value = { values[attribute.trackedEntityAttribute.id] }
                                            labelWidth = { 60 }
                                            onChange = { this.onChange }
                                            disabled = { attribute.trackedEntityAttribute.code === 'district'
                                                && districts.length === 0 }
                                            helperText = 'Select state first'
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

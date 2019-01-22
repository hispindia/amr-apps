import React, { Component } from 'react';
import { Typography, Grid } from '@material-ui/core';
import { /*getPatient,*/ getProgramAttributes, getDistricts, addPatient } from '../../api/api';
import { InputField } from '../../components/InputField';
import { DateField } from '../../components/DateField';
import { RadioSelector } from '../../components/RadioSelector';
import { ObjectSelect } from '../../components/ObjectSelect';
import { Button, Card } from '@dhis2/ui/core'


export class PatientInformation extends Component {
    state = {
        loading: true,
        values: {},
        stateId: '',
        districts: [],
        uniques: []
    }

    componentDidMount = async () => {
        const programAttributes = await getProgramAttributes();
        let values = {};
        let uniques = {};
        let stateId = '';
        for(let i = 0; i < programAttributes.length; i++) {
            values[programAttributes[i].trackedEntityAttribute.id] = '';
            if(programAttributes[i].trackedEntityAttribute.code === 'state')
                stateId = programAttributes[i].trackedEntityAttribute.id;
            if(programAttributes[i].trackedEntityAttribute.unique)
                uniques[programAttributes[i].trackedEntityAttribute.id] = true;
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

    onClick = async () => {
        await addPatient(this.state.values);
    }

    validate = () => {
        const { attributes, values, uniques } = this.state;
        for(let i = 0; i < attributes.length; i++)
            if(attributes[i].mandatory)
                if(values[attributes[i].trackedEntityAttribute.id] === '')
                    return false;
        for(let key in uniques)
            if(!uniques[key])
                return false;
        return true;
    }

    setUniqueValid = (name, valid) => {
        let uniques = {...this.state.uniques};
        uniques[name] = valid;
        this.setState({ uniques: uniques });
    }

    render() {
        const {
            loading,
            attributes,
            values,
            districts,
        } = this.state;

        console.log(this.state)

        if(loading) return null;

        return (
            <Card style={{ margin: "20px 34px 20px 20px" }}>
                <div style={{ margin: "20px 34px 20px 20px" }}>
                    <Typography variant="h6" component="h6" style={{ padding: "8px 8px 20px 8px" }}>
                        Patient information
                    </Typography>
                    <Grid container spacing={16} direction='column'>
                        {attributes.map(attribute => (
                            <Grid item md key={attribute.trackedEntityAttribute.id}>
                                {attribute.trackedEntityAttribute.valueType === 'AGE' ? (
                                    <DateField
                                        required = { attribute.mandatory }
                                        unique = { attribute.trackedEntityAttribute.unique }
                                        name = { attribute.trackedEntityAttribute.id }
                                        label = { attribute.trackedEntityAttribute.displayName }
                                        value = { values[attribute.trackedEntityAttribute.id] }
                                        onChange = { this.onChange }
                                />
                                ) : attribute.trackedEntityAttribute.optionSetValue ? (
                                        attribute.trackedEntityAttribute.optionSet.options.length < 5 ? (
                                            <RadioSelector
                                                required = { attribute.mandatory }
                                                objects = { attribute.trackedEntityAttribute.optionSet.options }
                                                name = { attribute.trackedEntityAttribute.id }
                                                label = { attribute.trackedEntityAttribute.displayName }
                                                value = { values[attribute.trackedEntityAttribute.id] }
                                                onChange = { this.onChange }
                                            />
                                        ) : (
                                            <ObjectSelect
                                                required = { attribute.mandatory }
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
                                        required = { attribute.mandatory }
                                        onUnique = { this.setUniqueValid }
                                        name = { attribute.trackedEntityAttribute.id }
                                        label = { attribute.trackedEntityAttribute.displayName }
                                        value = { values[attribute.trackedEntityAttribute.id] }
                                        onChange = { this.onChange }
                                    />
                                }
                            </Grid>
                        ))}
                    </Grid>
                    <Button variant="contained" kind="primary" style={{ margin: 8 }} onClick={this.onClick} disabled={!this.validate()} icon='done'>
                        Submit
                    </Button>
                </div>
            </Card>
        );
    }
}

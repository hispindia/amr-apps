import React, { Component } from 'react';
import { Button, Card } from '@dhis2/ui/core';
import { Row, Heading } from '../../helpers/helpers';
import { getProgramAttributes, getDistricts, addPatient, getPatient } from '../../api/api';
import { TextInput } from '../../components/TextInput';
import { DateField } from '../../components/DateField';
import { RadioSelector } from '../../components/RadioSelector';
import { ObjectSelect } from '../../components/ObjectSelect';


export class PatientInformation extends Component {
    state = {
        loading: true,
        values: {},
        stateId: '',
        districts: [],
        uniques: []
    }

    componentDidMount = async () => {
        let programAttributes = await getProgramAttributes();
        let values = {};
        let uniques = {};
        let stateId = '';
        let districts = [];
        let id = '';
        let isNewPatient = true;
        for(let i = 0; i < programAttributes.length; i++) {
            values[programAttributes[i].trackedEntityAttribute.id] = '';
            if(programAttributes[i].trackedEntityAttribute.code === 'state')
                stateId = programAttributes[i].trackedEntityAttribute.id;
            if(programAttributes[i].trackedEntityAttribute.unique)
                uniques[programAttributes[i].trackedEntityAttribute.id] = true;
            if(programAttributes[i].trackedEntityAttribute.optionSetValue) {
                let options = [];
                let length = programAttributes[i].trackedEntityAttribute.optionSet.options.length
                for(let j = 0; j < length; j++) {
                    options.push({
                        value: programAttributes[i].trackedEntityAttribute.optionSet.options[j].code,
                        label: programAttributes[i].trackedEntityAttribute.optionSet.options[j].displayName
                    });
                }
                programAttributes[i].trackedEntityAttribute.optionSet.options = options;
            }
        }

        if(this.props.match.params.id) {
            const patientData = await this.searchPatient(this.props.match.params.id);
            values = patientData.values;
            id = patientData.id;
            districts = await this.addDistricts(values[stateId]);
            isNewPatient = false;
        }

        this.setState({
            attributes: programAttributes,
            values: values,
            id: id,
            stateId: stateId,
            districts: districts,
            isNewPatient: isNewPatient,
            loading: false
        });
        console.log(id)
    }

    searchPatient = async value => {
        const data = await getPatient(value);
        let patientData = { values: [], id: data.trackedEntityInstance };
        if(data) {
            for(let i = 0; i < data.attributes.length; i++)
                patientData.values[data.attributes[i].attribute] = data.attributes[i].value;
        }
        return patientData;
    }

    addDistricts = async value => {
        let options = await getDistricts(value);
            let districts = [];
            for(let j = 0; j < options.length; j++)
                districts.push({
                    value: options[j].code,
                    label: options[j].displayName
                });
        return districts;
    }

    onChange = async (name, value) => {
        let values = {...this.state.values};
        values[name] = value;
        if(name === this.state.stateId) {
            this.setState({
                values: values,
                districts: await this.addDistricts(value)
            })
        }
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
            isNewPatient
        } = this.state;

        console.log(this.state)

        if(loading) return null;

        return (
            <Card>
                <div style={{ margin: 20 }}>
                    <Heading>
                        Patient information
                    </Heading>
                        {attributes.map(attribute => (
                            <div key={attribute.trackedEntityAttribute.id} style={{ marginBottom: 24 }}>
                                {attribute.trackedEntityAttribute.valueType === 'AGE' ? (
                                    <DateField
                                        required = { attribute.mandatory }
                                        unique = { attribute.trackedEntityAttribute.unique }
                                        name = { attribute.trackedEntityAttribute.id }
                                        label = { attribute.trackedEntityAttribute.displayName }
                                        value = { values[attribute.trackedEntityAttribute.id] }
                                        onChange = { this.onChange }
                                        disabled = { !isNewPatient }
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
                                                disabled = { !isNewPatient }
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
                                                disabled = { !isNewPatient || (attribute.trackedEntityAttribute.code === 'district'
                                                    && districts.length === 0) }
                                                helperText = { !isNewPatient ? '' : 'Select state first' }
                                            />)
                                ) : <TextInput
                                        required = { attribute.mandatory }
                                        unique = { attribute.trackedEntityAttribute.unique }
                                        onUnique = { this.setUniqueValid }
                                        name = { attribute.trackedEntityAttribute.id }
                                        label = { attribute.trackedEntityAttribute.displayName }
                                        value = { values[attribute.trackedEntityAttribute.id] }
                                        onChange = { this.onChange }
                                        disabled = { !isNewPatient }
                                    />
                                }
                            </div>
                        ))}
                    <div style={{ marginTop: 32 }}>
                        {isNewPatient ? <Button
                            variant="contained"
                            kind="primary"
                            onClick={this.onClick}
                            disabled={!this.validate()}
                            icon='done'>
                            Submit
                        </Button>
                        : <Row>
                            <div style={{paddingRight: 12}}>
                                <Button
                                    variant="contained"
                                    kind="primary"
                                    onClick={this.onClick}
                                    disabled={!this.validate()}
                                    icon='edit'>
                                    Edit
                                </Button>
                            </div>
                            <Button
                                variant="contained"
                                kind="primary"
                                onClick={this.onClick}
                                disabled={!this.validate()}
                                icon='delete'>
                                Delete
                            </Button>
                        </Row> }
                    </div>
                </div>
            </Card>
        );
    }
}

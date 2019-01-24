import React, { Component } from 'react';
import { Redirect } from 'react-router-dom'
import { Grid, withWidth } from "@material-ui/core";
import { Card, LinearProgress } from '@dhis2/ui/core';
import { Heading } from '../../helpers/helpers';
import { getProgramAttributes, getDistricts, addPatient, getPatient, deletePatient, updatePatient } from '../../api/api';
import { TextInput } from '../../components/TextInput';
import { DateField } from '../../components/DateField';
import { RadioSelector } from '../../components/RadioSelector';
import { ObjectSelect } from '../../components/ObjectSelect';
import { EntityButtons } from './EntityButtons';


const directions = {
    xs: "column-reverse",
    sm: "column-reverse"
};

export class EntityInformation extends Component {
    state = {
        loading: true,
        values: {},
        stateId: '',
        districts: [],
        uniques: [],
        querying: false,
        goToHome: false,
        editing: false,
        unchanged: false
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

        if(this.props.id) {
            const patientData = await this.searchPatient(this.props.id);
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
            loading: false,
            half: Math.floor(programAttributes.length / 2)
        });
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
                districts: await this.addDistricts(value),
                unchanged: false
            })
        }
        else
            this.setState({ values: values, unchanged: false })
    }

    onSubmitClick = async () => {
        this.setState({ querying: true })
        if(!this.state.editing) {
            await addPatient(this.state.values);
            this.setState({ isNewPatient: false, querying: false });
        }
        else {
            await updatePatient(this.state.id, this.state.values);
            this.setState({ isNewPatient: false, editing: false, querying: false });
        }
    }

    onEditClick = () => {
        this.setState({ isNewPatient: true, editing: true, unchanged: true });
    }

    onDeleteClick = async () => {
        await deletePatient(this.state.id);
        this.setState({ goToHome: true });
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

    getButtonProps = () => {
        return this.state.isNewPatient ? [{
            label: 'Submit',
            onClick: this.onSubmitClick,
            disabled: !this.validate() || this.state.unchanged,
            icon: 'done'
        }] : [{
            label: 'Edit',
            onClick: this.onEditClick,
            disabled: this.state.querying,
            icon: 'edit'
        },
        {
            label: 'Delete',
            onClick: this.onDeleteClick,
            disabled: this.state.querying,
            icon: 'delete'
        }];
    }

    getInput = (attribute) => {
        const {
            values,
            districts,
            isNewPatient,
        } = this.state;

        return(
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
        );
    }

    render() {
        const {
            loading,
            attributes,
            querying,
            goToHome,
            half
        } = this.state;

        if(goToHome)
            return <Redirect push to={"/"}/>;

        if(loading) return null;

        return (
            <div>
                {querying ? <LinearProgress/> : null}
                <Card>
                    <div style={{ margin: 20 }}>
                        <Heading>
                            Patient information
                        </Heading>
                        <Grid container spacing={16}>
                            <Grid item sm>
                                {attributes.filter(attribute => attribute.sortOrder <= half)
                                    .map(attribute => this.getInput(attribute))}
                            </Grid>
                            <Grid item sm>
                                {attributes.filter(attribute => attribute.sortOrder > half)
                                    .map(attribute => this.getInput(attribute))}
                            </Grid>
                        </Grid>
                        <EntityButtons buttons = { this.getButtonProps() }/>
                    </div>
                </Card>
            </div>
        );
    }
}

export default withWidth()(EntityInformation);

import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { Grid } from '@material-ui/core'
import { Card } from '@dhis2/ui/core'
import { Heading } from '../../helpers/helpers'
import {
    getProgramAttributes,
    getDistricts,
    addPerson,
    getPerson,
    deletePerson,
    updatePerson,
} from '../../api/api'
import { EntityButtons } from '../'
import { TextInput, AgeInput, RadioInput, SelectInput } from '../../inputs'

/**
 * Entity information section.
 */
class EntityInformation extends Component {
    state = {
        values: {}, // Current or new values.
        stateId: '', // Districts are populated when state is selected.
        districts: [], // Populated after state is selected.
        uniques: [], // Unique textfield values are validated.
        goToHome: false, // Redirects to home after deleting entity.
        editing: false, // Will be true after Edit button is clicked.
        unchanged: false, // Submit button is disabled when editing and values are unchanged.
    }

    componentDidMount = async () => {
        let programAttributes = await getProgramAttributes()
        let values = {}
        let uniques = {}
        let stateId = ''
        let districts = []
        let id = ''
        let isNewPatient = true
        for (let i = 0; i < programAttributes.length; i++) {
            values[programAttributes[i].trackedEntityAttribute.id] = ''
            if (programAttributes[i].trackedEntityAttribute.code === 'state')
                stateId = programAttributes[i].trackedEntityAttribute.id
            if (programAttributes[i].trackedEntityAttribute.unique)
                uniques[programAttributes[i].trackedEntityAttribute.id] = true
            if (programAttributes[i].trackedEntityAttribute.optionSetValue) {
                let options = []
                for (
                    let j = 0;
                    j <
                    programAttributes[i].trackedEntityAttribute.optionSet
                        .options.length;
                    j++
                ) {
                    options.push({
                        value:
                            programAttributes[i].trackedEntityAttribute
                                .optionSet.options[j].code,
                        label:
                            programAttributes[i].trackedEntityAttribute
                                .optionSet.options[j].displayName,
                    })
                }
                programAttributes[
                    i
                ].trackedEntityAttribute.optionSet.options = options
            }
        }

        if (this.props.id) {
            const patientData = await this.searchEntity(this.props.id)
            values = patientData.values
            id = patientData.id
            districts = await this.addDistricts(values[stateId])
            isNewPatient = false
        }

        this.setState({
            attributes: programAttributes,
            values: values,
            id: id,
            stateId: stateId,
            districts: districts,
            isNewPatient: isNewPatient,
            half: Math.floor(programAttributes.length / 2),
        })
    }

    /**
     * Searches for person by patient registration number and gets values.
     */
    searchEntity = async value => {
        const data = await getPerson(value)
        let patientData = { values: [], id: data.trackedEntityInstance }
        if (data) {
            for (let i = 0; i < data.attributes.length; i++)
                patientData.values[data.attributes[i].attribute] =
                    data.attributes[i].value
        }
        return patientData
    }

    /**
     * Adds the selected state's districts.
     */
    addDistricts = async value => {
        let options = await getDistricts(value)
        let districts = []
        for (let j = 0; j < options.length; j++)
            districts.push({
                value: options[j].code,
                label: options[j].displayName,
            })
        return districts
    }

    /**
     * Called on every input field change.
     */
    onChange = async (name, value) => {
        let values = { ...this.state.values }
        values[name] = value
        if (name === this.state.stateId) {
            this.setState({
                values: values,
                districts: await this.addDistricts(value),
                unchanged: false,
            })
        } else this.setState({ values: values, unchanged: false })
    }

    /**
     * On submit button click.
     */
    onSubmitClick = async () => {
        if (!this.state.editing) {
            await addPerson(this.state.values, this.props.orgUnit)
            this.setState({ isNewPatient: false })
            this.props.onEntityAdded()
        } else {
            await updatePerson(this.state.id, this.state.values)
            this.setState({
                isNewPatient: false,
                editing: false,
            })
        }
    }

    /**
     * On edit button click.
     */
    onEditClick = () => {
        this.setState({ isNewPatient: true, editing: true, unchanged: true })
    }

    /**
     * On delete button click.
     */
    onDeleteClick = async () => {
        await deletePerson(this.state.id)
        this.props.history.push('/')
    }

    /**
     * Checks that no required field is empty and that uniques are validated.
     */
    validate = () => {
        const { attributes, values, uniques } = this.state
        for (let i = 0; i < attributes.length; i++)
            if (attributes[i].mandatory)
                if (values[attributes[i].trackedEntityAttribute.id] === '')
                    return false
        for (let key in uniques) if (!uniques[key]) return false
        return true
    }

    /**
     * Called when a unique value is validated.
     */
    setUniqueValid = (name, valid) => {
        let uniques = { ...this.state.uniques }
        uniques[name] = valid
        this.setState({ uniques: uniques })
    }

    /**
     * Returns buttons based on adding new person or editing.
     */
    getButtonProps = () => {
        return this.state.isNewPatient
            ? [
                  {
                      label: 'Submit',
                      onClick: this.onSubmitClick,
                      disabled: !this.validate() || this.state.unchanged,
                      icon: 'done',
                      kind: 'primary',
                  },
              ]
            : [
                  {
                      label: 'Edit',
                      onClick: this.onEditClick,
                      disabled: false,
                      icon: 'edit',
                      kind: 'primary',
                  },
                  {
                      label: 'Delete',
                      onClick: this.onDeleteClick,
                      disabled: false,
                      icon: 'delete',
                      kind: 'destructive',
                  },
              ]
    }

    /**
     * Returns appropriate input type.
     */
    getInput = attribute => {
        const { values, districts, isNewPatient } = this.state

        return (
            <div
                key={attribute.trackedEntityAttribute.id}
                style={{ marginBottom: 24 }}
            >
                {attribute.trackedEntityAttribute.valueType === 'AGE' ? (
                    <AgeInput
                        required={attribute.mandatory}
                        unique={attribute.trackedEntityAttribute.unique}
                        name={attribute.trackedEntityAttribute.id}
                        label={attribute.trackedEntityAttribute.displayName}
                        value={values[attribute.trackedEntityAttribute.id]}
                        onChange={this.onChange}
                        disabled={!isNewPatient}
                    />
                ) : attribute.trackedEntityAttribute.optionSetValue ? (
                    attribute.trackedEntityAttribute.optionSet.options.length <
                    5 ? (
                        <RadioInput
                            required={attribute.mandatory}
                            objects={
                                attribute.trackedEntityAttribute.optionSet
                                    .options
                            }
                            name={attribute.trackedEntityAttribute.id}
                            label={attribute.trackedEntityAttribute.displayName}
                            value={values[attribute.trackedEntityAttribute.id]}
                            onChange={this.onChange}
                            disabled={!isNewPatient}
                        />
                    ) : (
                        <SelectInput
                            required={attribute.mandatory}
                            objects={
                                attribute.trackedEntityAttribute.code !==
                                'district'
                                    ? attribute.trackedEntityAttribute.optionSet
                                          .options
                                    : districts
                            }
                            name={attribute.trackedEntityAttribute.id}
                            label={attribute.trackedEntityAttribute.displayName}
                            value={values[attribute.trackedEntityAttribute.id]}
                            labelWidth={60}
                            onChange={this.onChange}
                            disabled={
                                !isNewPatient ||
                                (attribute.trackedEntityAttribute.code ===
                                    'district' &&
                                    districts.length === 0)
                            }
                            helperText={
                                !isNewPatient ? '' : 'Select state first'
                            }
                        />
                    )
                ) : (
                    <TextInput
                        required={attribute.mandatory}
                        unique={attribute.trackedEntityAttribute.unique}
                        onUnique={this.setUniqueValid}
                        name={attribute.trackedEntityAttribute.id}
                        label={attribute.trackedEntityAttribute.displayName}
                        value={values[attribute.trackedEntityAttribute.id]}
                        onChange={this.onChange}
                        disabled={!isNewPatient}
                    />
                )}
            </div>
        )
    }

    render() {
        const { attributes, half } = this.state

        if (!attributes) return null

        return (
            <Card>
                <div style={{ margin: 16 }}>
                    <Heading>Information</Heading>
                    <Grid container spacing={16}>
                        <Grid item xs>
                            {attributes
                                .filter(
                                    attribute => attribute.sortOrder <= half
                                )
                                .map(attribute => this.getInput(attribute))}
                        </Grid>
                        <Grid item xs>
                            {attributes
                                .filter(attribute => attribute.sortOrder > half)
                                .map(attribute => this.getInput(attribute))}
                        </Grid>
                    </Grid>
                    <EntityButtons buttons={this.getButtonProps()} />
                </div>
            </Card>
        )
    }
}

export default withRouter(EntityInformation)

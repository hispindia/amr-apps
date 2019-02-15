import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { Grid } from '@material-ui/core'
import { Card } from '@dhis2/ui/core'
import { Heading } from '../../helpers/helpers'
import {
    getProgramAttributes,
    getDistricts,
    addPerson,
    getPersonValues,
    deletePerson,
    updatePerson,
    getStateAttributeId,
    getDistrictAttributeId,
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
            values = await getPersonValues(this.props.id)
            districts = await getDistricts(values[stateId])
            isNewPatient = false
        }

        this.setState({
            attributes: programAttributes,
            values: values,
            stateId: stateId,
            districts: districts,
            isNewPatient: isNewPatient,
            half: Math.floor(programAttributes.length / 2),
        })
    }

    /**
     * Called on every input field change.
     */
    onChange = async (name, value) => {
        let values = { ...this.state.values }
        values[name] = value
        if (name === getStateAttributeId()) {
            this.setState({
                values: values,
                districts: await getDistricts(value),
                unchanged: false,
            })
        } else this.setState({ values: values, unchanged: false })
    }

    /**
     * On submit button click.
     */
    onSubmitClick = async () => {
        if (!this.state.editing) {
            this.props.history.push(
                '/orgUnit/' +
                    this.props.match.params.orgUnit +
                    '/entity/' +
                    (await addPerson(this.state.values, this.props.orgUnit))
            )
            this.setState({ isNewPatient: false })
            this.props.onEntityAdded()
        } else {
            await updatePerson(this.props.id, this.state.values)
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
        await deletePerson(this.props.id)
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
                style={{ padding: 16 }}
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
                                attribute.trackedEntityAttribute.id !==
                                getDistrictAttributeId()
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
                                (attribute.trackedEntityAttribute.id ===
                                    getDistrictAttributeId() &&
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
                    <div
                        style={{
                            marginLeft: 8,
                            marginRight: 8,
                        }}
                    >
                        <Heading>Information</Heading>
                    </div>
                    <Grid container spacing={0}>
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

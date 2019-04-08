/* eslint no-eval: 0 */

import React, { Component } from 'react'
import { Grid } from '@material-ui/core'
import { Card, Button } from '@dhis2/ui/core'
import styled from 'styled-components'
import {
    Heading,
    Padding,
    Margin,
    MarginSides,
    MarginBottom,
} from '../../helpers/helpers'
import {
    getPersonValues,
    checkUnique,
} from '../../api/api'
import { TextInput, AgeInput, RadioInput, SelectInput } from '../../inputs'
import { ProgressSection } from '../ProgressSection'
import { ModalPopup } from '../'

const ButtonPositioned = styled.div`
    float: right;
    margin-right: 16px;
`

/**
 * Entity information section.
 */
export class PersonForm extends Component {
    state = {
        values: {}, // Current or new values.
        uniques: [], // Unique textfield values are validated.
        entityId: null,
        editing: false,
        loading: true,
        modal: null
    }

    componentDidMount = async () => {
        let { id, attributes, values, uniques, rules } = this.props

        if (id) {
            this.onNewValues(await getPersonValues(id), id)
            this.setState({
                uniques: uniques,
                half: Math.floor(trackedEntityTypeAttributes.length / 2),
                rules: rules,
                loading: false
            })
        }
        else {
            this.checkRules(values, attributes, rules)
            this.setState({
                uniques: uniques,
                half: Math.floor(attributes.length / 2),
                rules: rules,
                attributes: attributes,
                values: values,
                loading: false
            })
        }
    }

    componentDidUpdate = async prevProps => {
        const entityId = this.props.id
        if (entityId && entityId !== prevProps.id) {
            //this.setState({ loading: true })
            this.onNewValues(await getPersonValues(entityId), entityId)
            this.setState({ loading: false })
        }
    }

    /**
     * Called on every input field change.
     */
    onChange = (name, value) => {
        let values = { ...this.state.values }
        if (values[name] === value) return
        values[name] = value
        this.onNewValues(values)
    }

    onNewValues = (values, entityId) => {
        const { rules, uniques, entityId: currentEntityId } = this.state
        entityId = entityId ? entityId : currentEntityId
        let attributes = [...this.state.attributes]
        this.checkRules(values, attributes, rules)
        this.setState({
            values: values,
            attributes: attributes,
            entityId: entityId,
        })
        this.props.passValues({
            values: values,
            id: entityId,
            valid: this.validate(attributes, values, uniques)
        })
    }

    onEdit = () => this.setState({ editing: true })

    /**
     * Checks that no required field is empty and that uniques are validated.
     */
    validate = (attributes, values, uniques) => {
        if (
            attributes.find(
                attribute =>
                    attribute.mandatory &&
                    values[attribute.trackedEntityAttribute.id] === ''
            )
        )
            return false
        for (let key in uniques) if (!uniques[key]) return false
        return true
    }

    /**
     * Checks if unique value is valid.
     * @param {string} id - Attribute ID.
     * @param {string} value - Attribute value.
     * @param {string} label - Attribute label.
     * @returns {boolean} True if valid.
     */
    validateUnique = async (id, value, label) => {
        const entityId = await checkUnique(id, value)
        let uniques = { ...this.state.uniques }
        uniques[id] = entityId ? false : true
        if (!entityId) {
            this.setState({uniques: uniques})
            return true
        }
        this.setState({
            uniques: uniques,
            modal: {
                id: id,
                label: label,
                value: value,
                entityId: entityId
            }
        })
        return false
    }

    checkRules = (values, attributes, rules) => {
        rules.forEach(rule => {
            rule.programRuleActions.forEach(r => {
                switch (r.programRuleActionType) {
                    case 'SHOWOPTIONGROUP':
                        if (eval(rule.condition)) {
                            let affectedAttribute = attributes.find(
                                attribute =>
                                    attribute.trackedEntityAttribute.id ===
                                    r.trackedEntityAttribute.id
                            )
                            if (
                                affectedAttribute.trackedEntityAttribute
                                    .optionSet.id !== r.optionGroup.id
                            ) {
                                affectedAttribute.trackedEntityAttribute.optionSet = {
                                    id: r.optionGroup.id
                                }
                                // Only reset selected value if the options do not include current value.
                                if (
                                    !this.props.optionSets[affectedAttribute.trackedEntityAttribute.optionSet.id].find(
                                        option =>
                                            option.value ===
                                            values[
                                                affectedAttribute
                                                    .trackedEntityAttribute.id
                                            ]
                                    )
                                )
                                    values[affectedAttribute.trackedEntityAttribute.id] = ''
                            }
                        }
                        break
                    case 'HIDEFIELD':
                        const hide = eval(rule.condition)
                        let affectedAttribute = attributes.find(
                            attribute =>
                                attribute.trackedEntityAttribute.id ===
                                r.trackedEntityAttribute.id
                        )
                        if (hide !== affectedAttribute.hide) {
                            affectedAttribute.hide = hide
                            if (hide) values[affectedAttribute.trackedEntityAttribute.id] = ''
                        }
                        break
                    default:
                        break
                }
            })
        })
    }

    /**
     * Returns appropriate input type.
     */
    getInput = attribute => {
        if (attribute.hide) return null

        const { values, entityId, editing, uniques } = this.state
        const disabled = entityId && !editing ? true : false

        return (
            <Padding key={attribute.trackedEntityAttribute.id}>
                {attribute.trackedEntityAttribute.valueType === 'AGE' ? (
                    <AgeInput
                        required={attribute.mandatory}
                        unique={attribute.trackedEntityAttribute.unique}
                        name={attribute.trackedEntityAttribute.id}
                        label={attribute.trackedEntityAttribute.displayName}
                        value={values[attribute.trackedEntityAttribute.id]}
                        onChange={this.onChange}
                        disabled={disabled}
                    />
                ) : attribute.trackedEntityAttribute.optionSetValue ? (
                    this.props.optionSets[attribute.trackedEntityAttribute.optionSet.id].length < 4 ?
                    (
                        <RadioInput
                            required={attribute.mandatory}
                            objects={
                                this.props.optionSets[attribute.trackedEntityAttribute.optionSet
                                    .id]
                            }
                            name={attribute.trackedEntityAttribute.id}
                            label={attribute.trackedEntityAttribute.displayName}
                            value={values[attribute.trackedEntityAttribute.id]}
                            onChange={this.onChange}
                            disabled={disabled}
                        />
                    ) : (
                        <SelectInput
                            required={attribute.mandatory}
                            objects={
                                this.props.optionSets[attribute.trackedEntityAttribute.optionSet
                                    .id]
                            }
                            name={attribute.trackedEntityAttribute.id}
                            label={attribute.trackedEntityAttribute.displayName}
                            value={values[attribute.trackedEntityAttribute.id]}
                            onChange={this.onChange}
                            disabled={disabled}
                        />
                    )
                ) : (
                    <TextInput
                        required={attribute.mandatory}
                        unique={attribute.trackedEntityAttribute.unique}
                        uniqueValid={uniques && uniques[attribute.trackedEntityAttribute.id]}
                        validateUnique={this.validateUnique}
                        name={attribute.trackedEntityAttribute.id}
                        label={attribute.trackedEntityAttribute.displayName}
                        value={values[attribute.trackedEntityAttribute.id]}
                        onChange={this.onChange}
                        disabled={disabled}
                        type={attribute.trackedEntityAttribute.valueType === 'NUMBER' ? 'number' : 'text'}
                    />
                )}
            </Padding>
        )
    }

    onModalClick = async yes => {
        const { id, entityId } = this.state.modal
        let uniques = { ...this.state.uniques }
        uniques[id] = yes

        if (yes)
            this.onNewValues(await getPersonValues(entityId), entityId)

        this.setState({ uniques: uniques, modal: null })
    }

    render() {
        const { attributes, half, entityId, editing, loading, modal } = this.state

        if (loading) return <ProgressSection />

        return (
            <MarginBottom>
                {modal && <ModalPopup
                    text={
                        <span>
                            A person with <em>{modal.label}</em> {modal.value} is already registered.
                            <br/>
                            Do you want to get this person?
                        </span>
                    }
                    onClick={this.onModalClick}
                />}
                <Card>
                    <Margin>
                        {entityId && !editing && this.props.showEdit && (
                            <ButtonPositioned>
                                <Button
                                    kind="secondary"
                                    onClick={this.onEdit}
                                    icon="edit"
                                    size="small"
                                >
                                    Edit
                                </Button>
                            </ButtonPositioned>
                        )}
                        <MarginSides>
                            <Heading>Person</Heading>
                        </MarginSides>
                        <Grid container spacing={0}>
                            <Grid item xs>
                                {attributes
                                    .slice(0, half)
                                    .map(attribute => this.getInput(attribute))}
                            </Grid>
                            <Grid item xs>
                                {attributes
                                    .slice(half)
                                    .map(attribute => this.getInput(attribute))}
                            </Grid>
                        </Grid>
                    </Margin>
                </Card>
            </MarginBottom>
        )
    }
}

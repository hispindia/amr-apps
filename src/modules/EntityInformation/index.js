/* eslint no-eval: 0 */

import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { Grid } from '@material-ui/core'
import { Card } from '@dhis2/ui/core'
import {
    Heading,
    Padding,
    Margin,
    MarginSides,
    MarginBottom,
    ProgressSection,
} from '../../helpers/helpers'
import {
    getEntityAttributes,
    getPersonValues,
    checkUnique,
} from '../../api/api'
import { TextInput, AgeInput, RadioInput, SelectInput } from '../../inputs'

/**
 * Entity information section.
 */
class EntityInformation extends Component {
    state = {
        values: {}, // Current or new values.
        uniques: [], // Unique textfield values are validated.
        entityId: null,
        readOnly: false,
    }

    componentDidMount = async () => {
        let { attributes, values, uniques, rules } = await getEntityAttributes(
            this.props.id ? this.props.id : null
        )
        this.checkRules(values, attributes, rules)

        this.setState({
            attributes: attributes,
            values: values,
            uniques: uniques,
            half: Math.floor(attributes.length / 2),
            rules: rules,
        })
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
        let attributes = [...this.state.attributes]
        const { rules, uniques } = this.state
        this.checkRules(values, attributes, rules)
        this.setState({
            values: values,
            attributes: attributes,
            entityId: entityId ? entityId : null,
        })
        if (this.validate(attributes, values, uniques))
            this.props.onValidValues(values, entityId)
    }

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
        if (entityId)
            if (
                window.confirm(
                    `A person with ${label} ${value} is already registered. Do you want to get this person?`
                )
            ) {
                this.onNewValues(await getPersonValues(entityId), entityId)
                return true
            } else return false
        let uniques = { ...this.state.uniques }
        uniques[id] = true
        this.setState({ uniques: uniques })
        return true
    }

    checkRules = (values, attributes, rules) => {
        rules.forEach(rule => {
            rule.programRuleActions.forEach(r => {
                switch (r.programRuleActionType) {
                    case 'SHOWOPTIONGROUP':
                        if (eval(r.programRule.condition)) {
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
                                    id: r.optionGroup.id,
                                    options: r.optionGroup.options,
                                }
                                // Only reset selected value if the options do not include current value.
                                if (
                                    !affectedAttribute.trackedEntityAttribute.optionSet.options.find(
                                        option =>
                                            option.value ===
                                            values[
                                                affectedAttribute
                                                    .trackedEntityAttribute.id
                                            ]
                                    )
                                )
                                    values[
                                        affectedAttribute.trackedEntityAttribute.id
                                    ] = ''
                            }
                        }
                        break
                    case 'HIDEFIELD':
                        const hide = eval(r.programRule.condition)
                        let affectedAttribute = attributes.find(
                            attribute =>
                                attribute.trackedEntityAttribute.id ===
                                r.trackedEntityAttribute.id
                        )
                        if (hide !== affectedAttribute.hide) {
                            affectedAttribute.hide = hide
                            values[
                                affectedAttribute.trackedEntityAttribute.id
                            ] = ''
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

        const { values, entityId } = this.state
        const disabled = entityId ? true : false

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
                    attribute.trackedEntityAttribute.optionSet.options.length <
                    4 ? (
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
                            disabled={disabled}
                        />
                    ) : (
                        <SelectInput
                            required={attribute.mandatory}
                            objects={
                                attribute.trackedEntityAttribute.optionSet
                                    .options
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
                        validateUnique={this.validateUnique}
                        name={attribute.trackedEntityAttribute.id}
                        label={attribute.trackedEntityAttribute.displayName}
                        value={values[attribute.trackedEntityAttribute.id]}
                        onChange={this.onChange}
                        disabled={disabled}
                    />
                )}
            </Padding>
        )
    }

    render() {
        const { attributes, half } = this.state

        if (!attributes) return <ProgressSection />

        return (
            <MarginBottom>
                <Card>
                    <Margin>
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

export default withRouter(EntityInformation)

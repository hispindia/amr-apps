/* eslint no-eval: 0 */

import React, { Component } from 'react'
import { Card } from '@dhis2/ui/core'
import { Grid } from '@material-ui/core'
import styled from 'styled-components'
import {
    Heading,
    Label,
    Margin,
    Padding,
    MarginSides,
    MarginBottom,
    updateEventValue
} from '../../'
import {
    TextInput,
    RadioInput,
    SelectInput,
    SwitchInput,
    CheckboxInput,
    DateInput,
} from '../../inputs'
import { ProgressSection } from '../'

const ChildSectionLabel = styled.div`
    margin: 16px 16px -16px;
`

export class RecordForm extends Component {
    state = { loading: true }

    componentDidMount = async () => await this.init()

    componentDidUpdate = async prevProps => {
        const { programStage, values } = this.props
        if (
            prevProps.programStage !== programStage ||
            prevProps.values !== values
        )
            await this.init()
    }

    init = async () => {
        this.setState({ loading: true })

        let { programStage, values } = this.props
        this.checkRules(values, programStage.programStageSections)

        this.setState({
            loading: false,
            programStage: programStage,
            values: values,
        })

        this.props.passValues(this.validateValues(programStage.programStageSections, values))
    }

    onChange = async (name, value) => {
        let values = { ...this.state.values }
        if (values[name] === value) return
        await updateEventValue(this.props.eventId, name, value)
        values[name] = value
        this.onNewValues(values)
    }

    onNewValues = values => {
        let programStage = { ...this.state.programStage }
        this.checkRules(values, programStage.programStageSections)
        this.setState({
            values: values,
            programStage: programStage,
        })
        this.props.passValues(this.validateValues(programStage.programStageSections, values))
    }

    validateValues = (sections, values) => {
        for (let section of sections) {
            if (section.childSections)
                this.validateValues(section.childSections, values)
            if (
                section.dataElements.find(
                    dataElement =>
                        dataElement.required && values[dataElement.id] === ''
                )
            ) {
                console.log(section.dataElements.find(
                    dataElement =>
                        dataElement.required && values[dataElement.id] === ''
                ))
                return false
            }
        }
        return true
    }

    checkRules = (values, sections) => {
        /**
         * Gets the data element that is affected by rule.
         * @param {string} id - Data element id.
         * @returns {Object} Data element.
         */
        const getAffectedDataElement = id => {
            let affectedDataElement
            for (let section of sections) {
                if (section.childSections)
                    for (let childSection of section.childSections) {
                        affectedDataElement = childSection.dataElements.find(
                            dataElement => dataElement.id === id
                        )
                        if (affectedDataElement) return affectedDataElement
                    }
                affectedDataElement = section.dataElements.find(
                    dataElement => dataElement.id === id
                )
                if (affectedDataElement) return affectedDataElement
            }
            return null
        }

        /**
         * Gets the section that is affected by rule.
         * @param {string} id - section id.
         * @returns {Object} Section.
         */
        const getAffectedSection = id => {
            let affectedSection
            for (let section of sections) {
                if (section.id === id) return section
                if (section.childSections) {
                    affectedSection = section.childSections.find(
                        childSection => childSection.id === id
                    )
                    if (affectedSection) return affectedSection
                }
            }
            return null
        }

        this.props.rules.forEach(rule => {
            rule.programRuleActions.forEach(r => {
                try {
                    switch (r.programRuleActionType) {
                        case 'SHOWOPTIONGROUP':
                            if (eval(rule.condition)) {
                                let affectedDataElement = getAffectedDataElement(
                                    r.dataElement.id
                                )
                                // Changing options if it is not the same.
                                if (
                                    affectedDataElement.optionSet.id !==
                                    r.optionGroup.id
                                ) {
                                    affectedDataElement.optionSet = {
                                        id: r.optionGroup.id,
                                        options: r.optionGroup.options,
                                    }
                                    // Only reset selected value if the options do not include current value.
                                    if (
                                        !affectedDataElement.optionSet.options.find(
                                            option =>
                                                option.value ===
                                                values[affectedDataElement.id]
                                        )
                                    )
                                        values[affectedDataElement.id] = ''
                                }
                            }
                            break
                        case 'HIDEFIELD':
                            const hide = eval(rule.condition)
                            let affectedDataElement = getAffectedDataElement(
                                r.dataElement.id
                            )
                            if (affectedDataElement)
                                if (hide !== affectedDataElement.hide) {
                                    affectedDataElement.hide = hide
                                    values[affectedDataElement.id] = ''
                                }
                            break
                        case 'HIDESECTION':
                            const hideS = eval(rule.condition)
                            let affectedSection = getAffectedSection(
                                r.programStageSection.id
                            )
                            if (affectedSection)
                                if (hideS !== affectedSection.hide)
                                    affectedSection.hide = hideS
                            break
                        case 'ASSIGN':
                            if (eval(rule.condition)) {
                                let affectedDataElement = getAffectedDataElement(
                                    r.dataElement.id
                                )
                                // Assigning value.
                                values[affectedDataElement.id] = r.data
                                affectedDataElement.disabled = true
                            }
                            break
                        default:
                            break
                    }
                } catch {
                    console.warn('Failed to evaluate rule:', rule)
                }
            })
        })
    }

    /**
     * Gets the child section component.
     * @param {Object} childSection - Child section.
     * @returns {Component} Child section component.
     */
    getChildSection = childSection => {
        // If all, or all but one, of the data elements are of type TRUE_ONLY, the section is rendered as a group of checkboxes.
        if (
            childSection.dataElements.filter(
                dataElement => dataElement.valueType === 'TRUE_ONLY'
            ).length >
            childSection.dataElements.length - 2
        ) {
            let objects = {}
            let values = {}
            childSection.dataElements
                .filter(dataElement => dataElement.valueType === 'TRUE_ONLY')
                .forEach(dataElement => {
                    objects[dataElement.id] = {
                        label: dataElement.displayFormName,
                        disabled: dataElement.disabled || this.props.completed,
                    }
                    values[dataElement.id] = this.state.values[dataElement.id]
                })
            return (
                <div key={childSection.name}>
                    <Padding>
                        <CheckboxInput
                            objects={objects}
                            name={childSection.name}
                            label={childSection.name}
                            values={values}
                            onChange={this.onChange}
                        />
                    </Padding>
                    {childSection.dataElements
                        .filter(
                            dataElement =>
                                dataElement.valueType === 'TEXT' &&
                                !dataElement.hide
                        )
                        .map(dataElement => this.getDataElement(dataElement))}
                </div>
            )
        }

        return (
            <div key={childSection.name}>
                <ChildSectionLabel>
                    <Label>{childSection.name}</Label>
                </ChildSectionLabel>
                {childSection.dataElements
                    .filter(dataElement => !dataElement.hide)
                    .map(dataElement => this.getDataElement(dataElement))}
            </div>
        )
    }

    /**
     * Gets the data element component.
     * @param {Object} dataElement - Data element.
     * @returns {Component} Date element component.
     */
    getDataElement = dataElement => {
        const completed = this.props.completed
        return (
            <Padding key={dataElement.id}>
                {dataElement.optionSetValue ? (
                    dataElement.optionSet.options.length < 5 ? (
                        <RadioInput
                            objects={dataElement.optionSet.options}
                            name={dataElement.id}
                            label={dataElement.displayFormName}
                            value={this.state.values[dataElement.id]}
                            onChange={this.onChange}
                            required={dataElement.required}
                            disabled={dataElement.disabled || completed}
                        />
                    ) : (
                        <SelectInput
                            objects={dataElement.optionSet.options}
                            name={dataElement.id}
                            label={dataElement.displayFormName}
                            value={this.state.values[dataElement.id]}
                            onChange={this.onChange}
                            required={dataElement.required}
                            disabled={dataElement.disabled || completed}
                        />
                    )
                ) : dataElement.valueType === 'TRUE_ONLY' ? (
                    <SwitchInput
                        name={dataElement.id}
                        label={dataElement.displayFormName}
                        checked={this.state.values[dataElement.id]}
                        onChange={this.onChange}
                        required={dataElement.required}
                        disabled={dataElement.disabled || completed}
                    />
                ) : dataElement.valueType === 'DATE' ? (
                    <DateInput
                        name={dataElement.id}
                        label={dataElement.displayFormName}
                        value={this.state.values[dataElement.id]}
                        required={dataElement.required}
                        onChange={this.onChange}
                        disabled={dataElement.disabled || completed}
                    />
                ) : (
                    <TextInput
                        name={dataElement.id}
                        label={dataElement.displayFormName}
                        value={this.state.values[dataElement.id]}
                        required={dataElement.required}
                        onChange={this.onChange}
                        disabled={dataElement.disabled || completed}
                        type={dataElement.valueType === 'NUMBER' ? 'number' : 'text'}
                        /*backgroundColor={dataElement.color}*/
                    />
                )}
            </Padding>
        )
    }

    render() {
        const { programStage, loading } = this.state

        if (loading) return <ProgressSection />

        const sections = programStage.programStageSections.filter(
            section => !section.hide && !section.hideWithValues
        )

        return (
            <MarginBottom>
                {sections.map(section => {
                    const dataElements = section.dataElements.filter(
                        dataElement => !dataElement.hide
                    )
                    const half = Math.ceil(
                        (dataElements.length +
                            (section.childSections
                                ? section.childSections.length
                                : 0)) /
                            2
                    )

                    let childSections = section.childSections
                    if (section.childSections)
                        childSections = section.childSections.filter(
                            childSection =>
                                !childSection.hide &&
                                !childSection.hideWithValues
                        )

                    return (
                        <MarginBottom key={section.id}>
                            <Card>
                                <Margin>
                                    <MarginSides>
                                        <Heading>{section.displayName}</Heading>
                                    </MarginSides>
                                    {dataElements.length > 0 ? (
                                        section.renderType.DESKTOP.type ===
                                        'MATRIX' ? (
                                            <Grid container spacing={0}>
                                                {section.dataElements
                                                    .filter(
                                                        dataElement =>
                                                            !dataElement.hide
                                                    )
                                                    .map(dataElement => (
                                                        <Grid
                                                            item
                                                            key={dataElement.id}
                                                        >
                                                            {this.getDataElement(
                                                                dataElement
                                                            )}
                                                        </Grid>
                                                    ))}
                                            </Grid>
                                        ) : (
                                            <Grid container spacing={0}>
                                                <Grid item xs>
                                                    {dataElements
                                                        .slice(0, half)
                                                        .map(dataElement =>
                                                            this.getDataElement(
                                                                dataElement
                                                            )
                                                        )}
                                                </Grid>
                                                <Grid item xs>
                                                    {dataElements
                                                        .slice(half)
                                                        .map(dataElement =>
                                                            this.getDataElement(
                                                                dataElement
                                                            )
                                                        )}
                                                    {childSections &&
                                                        childSections.map(
                                                            childSection =>
                                                                this.getChildSection(
                                                                    childSection
                                                                )
                                                        )}
                                                </Grid>
                                            </Grid>
                                        )
                                    ) : (
                                        <Grid container spacing={0}>
                                            <Grid item xs>
                                                {childSections &&
                                                    childSections
                                                        .slice(
                                                            0,
                                                            Math.ceil(
                                                                childSections.length /
                                                                    2
                                                            )
                                                        )
                                                        .map(childSection =>
                                                            this.getChildSection(
                                                                childSection
                                                            )
                                                        )}
                                            </Grid>
                                            <Grid item xs>
                                                {childSections &&
                                                    childSections
                                                        .slice(
                                                            Math.ceil(
                                                                childSections.length /
                                                                    2
                                                            )
                                                        )
                                                        .map(childSection =>
                                                            this.getChildSection(
                                                                childSection
                                                            )
                                                        )}
                                            </Grid>
                                        </Grid>
                                    )}
                                </Margin>
                            </Card>
                        </MarginBottom>
                    )
                })}
            </MarginBottom>
        )
    }
}

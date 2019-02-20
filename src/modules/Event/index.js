/* eslint no-eval: 0 */

import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { Card } from '@dhis2/ui/core'
import { Grid } from '@material-ui/core'
import styled from 'styled-components'
import {
    Heading,
    Row,
    Title,
    Label,
    Margin,
    Padding,
    MarginSides,
    MarginBottom,
} from '../../helpers/helpers'
import {
    getProgramStage,
    //getOrganisms,
    updateEvent,
    getTestFields,
    addEvent,
} from '../../api/api'
import {
    TextInput,
    RadioInput,
    SelectInput,
    SwitchInput,
    CheckboxInput,
    DateInput,
} from '../../inputs'
import { EntityButtons } from '../EntityButtons'
import IconButton from '../../inputs/IconButton'

const ChildSectionLabel = styled.div`
    margin: 16px 16px -16px;
`

export class Event extends Component {
    state = {
        programStage: null,
        values: {},
        showModal: true,
    }

    componentDidMount = async () => {
        const {
            programStage,
            values,
            organismDataElementId,
            isResend,
        } = await getProgramStage(
            this.props.match.params.event
                ? this.props.match.params.event
                : undefined
        )

        this.setState({
            programStage: programStage,
            //organisms: await getOrganisms(),
            values: values,
            organismDataElementId: organismDataElementId,
            isResend: isResend,
            testFields: values[organismDataElementId]
                ? await getTestFields(values[organismDataElementId])
                : {},
        })
    }

    onChange = async (name, value) => {
        let values = { ...this.state.values }
        let testFields = { ...this.state.testFields }
        values[name] = value

        if (name === this.state.organismDataElementId)
            testFields = await getTestFields(value)

        this.setState({ values: values, testFields: testFields })
    }

    getTestFieldColor = elementId => {
        try {
            const value = parseInt(this.state.values[elementId])
            const testField = this.state.testFields[elementId]

            if (value >= testField.Resistant) return 'red'
            else if (value >= testField.Intermediate_Low) return 'orange'
            else if (value < testField.Intermediate_High) return 'green'
        } catch {
            return ''
        }
    }

    onBackClicked = () => {
        this.props.history.push(
            '/orgUnit/' +
                this.props.match.params.orgUnit +
                '/entity/' +
                this.props.match.params.entity
        )
    }

    /**
     * Returns buttons based on adding new person or editing.
     */
    getButtonProps = () => {
        return true
            ? [
                  {
                      label: 'Submit',
                      onClick: this.onSubmitClick,
                      disabled: false, //!this.validate() || this.state.unchanged,
                      icon: 'done',
                      kind: 'primary',
                  },
              ]
            : [
                  {
                      label: 'Edit',
                      onClick: this.onSubmitClick,
                      disabled: false,
                      icon: 'edit',
                      kind: 'primary',
                  },
                  {
                      label: 'Delete',
                      onClick: this.onSubmitClick,
                      disabled: false,
                      icon: 'delete',
                      kind: 'destructive',
                  },
              ]
    }

    /**
     * On submit button click.
     */
    onSubmitClick = async () => {
        const { programStage, values } = this.state
        const sections = programStage.programStageSections.filter(
            section => !['Name', 'Approval status'].includes(section.name)
        )

        // Removing hidden values.
        sections.forEach(section => {
            const removeValues = dataElements => {
                dataElements
                    .filter(
                        dataElement =>
                            !this.shouldShow(dataElement) &&
                            values[dataElement.id] !== ''
                    )
                    .forEach(dataElement => (values[dataElement.id] = ''))
            }
            removeValues(section.dataElements)
            if (section.childSections)
                section.childSections.forEach(childSection =>
                    removeValues(childSection.dataElements)
                )
        })

        this.props.match.params.event
            ? await updateEvent(
                  this.state.values,
                  this.state.testFields,
                  this.props.match.params.event,
                  this.state.isResend
              )
            : await addEvent(
                  this.state.values,
                  this.state.testFields,
                  this.props.match.params.entity
              )
    }

    getChildSection = childSection => {
        switch (childSection.name) {
            case 'Comorbidity':
            case 'Patient with devices':
                let objects = {}
                let values = {}
                childSection.dataElements
                    .filter(
                        dataElement => dataElement.valueType === 'TRUE_ONLY'
                    )
                    .forEach(dataElement => {
                        objects[dataElement.id] = {
                            label: dataElement.displayFormName,
                            disabled: dataElement.disabled,
                        }
                        values[dataElement.id] = this.state.values[
                            dataElement.id
                        ]
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
                                    this.shouldShow(dataElement)
                            )
                            .map(dataElement =>
                                this.getDataElement(dataElement)
                            )}
                    </div>
                )
            case 'Disk Diffusion':
            case 'MIC':
                return (
                    <div key={childSection.name}>
                        <ChildSectionLabel>
                            <Label>{childSection.name}</Label>
                        </ChildSectionLabel>
                        {childSection.dataElements
                            .filter(dataElement => this.shouldShow(dataElement))
                            .filter(dataElement =>
                                this.state.testFields[dataElement.id]
                                    ? this.state.testFields[dataElement.id]
                                          .display
                                    : false
                            )
                            .map(dataElement =>
                                this.getDataElement(dataElement)
                            )}
                    </div>
                )
            default:
                return (
                    <div key={childSection.name}>
                        <ChildSectionLabel>
                            <Label>{childSection.name}</Label>
                        </ChildSectionLabel>
                        {childSection.dataElements
                            .filter(dataElement => this.shouldShow(dataElement))
                            .map(dataElement =>
                                this.getDataElement(dataElement)
                            )}
                    </div>
                )
        }
    }

    getDataElement = dataElement => {
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
                            disabled={dataElement.disabled}
                        />
                    ) : (
                        <SelectInput
                            objects={dataElement.optionSet.options}
                            name={dataElement.id}
                            label={dataElement.displayFormName}
                            value={this.state.values[dataElement.id]}
                            onChange={this.onChange}
                            required={dataElement.required}
                            disabled={dataElement.disabled}
                        />
                    )
                ) : dataElement.valueType === 'TRUE_ONLY' ? (
                    <SwitchInput
                        name={dataElement.id}
                        label={dataElement.displayFormName}
                        checked={this.state.values[dataElement.id]}
                        onChange={this.onChange}
                        required={dataElement.required}
                        disabled={dataElement.disabled}
                    />
                ) : dataElement.valueType === 'DATE' ? (
                    <DateInput
                        name={dataElement.id}
                        label={dataElement.displayFormName}
                        value={this.state.values[dataElement.id]}
                        required={dataElement.required}
                        onChange={this.onChange}
                        disabled={dataElement.disabled}
                    />
                ) : (
                    <TextInput
                        name={dataElement.id}
                        label={dataElement.displayFormName}
                        value={this.state.values[dataElement.id]}
                        required={dataElement.required}
                        onChange={this.onChange}
                        disabled={dataElement.disabled}
                        backgroundColor={
                            this.state.testFields
                                ? this.state.testFields[dataElement.id]
                                    ? this.getTestFieldColor(dataElement.id)
                                    : ''
                                : ''
                        }
                    />
                )}
            </Padding>
        )
    }

    shouldShow = element => {
        try {
            return element.hideCondition
                ? !this.evaluateAll(element.hideCondition)
                : true
        } catch {
            console.error('Evaluation failed:')
            console.error(element)
            return true
        }
    }

    evaluateAll = conditions => {
        for (let i = 0; i < conditions.length; i++)
            if (eval(conditions[i])) return true
        return false
    }

    render() {
        const { programStage } = this.state

        if (!programStage) return null

        const sections = programStage.programStageSections.filter(section =>
            this.shouldShow(section)
        )

        return (
            <Margin>
                <Row>
                    <IconButton
                        name="arrow_back"
                        icon="arrow_back"
                        onClick={this.onBackClicked}
                    />
                    <Title>{'Record'}</Title>
                </Row>
                {sections.map(section => {
                    const half = Math.ceil(
                        (section.dataElements.filter(dataElement =>
                            this.shouldShow(dataElement)
                        ).length +
                            (section.childSections
                                ? section.childSections.length
                                : 0)) /
                            2
                    )
                    const dataElements = section.dataElements.filter(
                        dataElement => this.shouldShow(dataElement)
                    )
                    let childSections = section.childSections
                    if (section.childSections)
                        childSections = section.childSections.filter(
                            childSection => this.shouldShow(childSection)
                        )
                    return (
                        <MarginBottom key={section.id}>
                            <Card>
                                <Margin>
                                    <MarginSides>
                                        <Heading>{section.displayName}</Heading>
                                    </MarginSides>
                                    {dataElements.length > 0 ? (
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
                                                {section.childSections
                                                    ? section.childSections
                                                          .filter(section =>
                                                              this.shouldShow(
                                                                  section
                                                              )
                                                          )
                                                          .map(childSection =>
                                                              this.getChildSection(
                                                                  childSection
                                                              )
                                                          )
                                                    : null}
                                            </Grid>
                                        </Grid>
                                    ) : (
                                        <Grid container spacing={0}>
                                            <Grid item xs>
                                                {childSections
                                                    ? childSections
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
                                                          )
                                                    : null}
                                            </Grid>
                                            <Grid item xs>
                                                {childSections
                                                    ? childSections
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
                                                          )
                                                    : null}
                                            </Grid>
                                        </Grid>
                                    )}
                                </Margin>
                            </Card>
                        </MarginBottom>
                    )
                })}
                <EntityButtons buttons={this.getButtonProps()} />
            </Margin>
        )
    }
}

export default withRouter(Event)

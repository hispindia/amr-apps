/* eslint no-eval: 0 */

import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
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

const ChildSectionLabel = styled.div`
    margin: 16px 16px -16px;
`

class EventInformation extends Component {
    state = {
        programStageId: null,
        programStage: null,
        values: {},
    }

    componentDidMount = async () => {
        await this.getProgramStage()
    }

    componentDidUpdate = async prevProps => {
        if (
            prevProps.programStageId !== this.props.programStageId ||
            prevProps.programId !== this.props.programId
        )
            await this.getProgramStage()
    }

    getProgramStage = async () => {
        const { programId, programStageId, organismCode } = this.props
        let { programStage, values, rules, isResend } = await getProgramStage(
            programId,
            programStageId,
            organismCode,
            this.props.match.params.event
                ? this.props.match.params.event
                : undefined
        )

        this.checkRules(values, programStage.programStageSections, rules)

        this.setState({
            programStage: programStage,
            //organisms: await getOrganisms(),
            values: values,
            isResend: isResend,
            programStageId: programStageId,
            rules: rules,
        })
    }

    onChange = async (name, value) => {
        let values = { ...this.state.values }
        let programStage = { ...this.state.programStage }
        values[name] = value

        this.checkRules(
            values,
            programStage.programStageSections,
            this.state.rules
        )

        this.setState({ values: values })
    }

    checkRules = (values, sections, rules) => {
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

        rules.forEach(rule => {
            rule.programRuleActions.forEach(r => {
                try {
                    switch (r.programRuleActionType) {
                        case 'SHOWOPTIONGROUP':
                            if (eval(rule.condition)) {
                                let affectedDataElement = getAffectedDataElement(
                                    r.dataElement.id
                                )
                                if (
                                    affectedDataElement.optionSet.id !==
                                    r.optionGroup.id
                                ) {
                                    affectedDataElement.optionSet = {
                                        id: r.optionGroup.id,
                                        options: r.optionGroup.options,
                                    }
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
                        default:
                            break
                    }
                } catch {
                    console.warn('Failed to evaluate rule:', rule)
                }
            })
        })
    }

    /*getTestFieldColor = elementId => {
        try {
            const value = parseInt(this.state.values[elementId])
            const testField = this.state.testFields[elementId]

            if (value >= testField.Resistant) return 'red'
            else if (value >= testField.Intermediate_Low) return 'orange'
            else if (value < testField.Intermediate_High) return 'green'
        } catch {
            return ''
        }
    }*/

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
        return []
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
                            dataElement.hide && values[dataElement.id] !== ''
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
                                    !dataElement.hide
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
                            .filter(dataElement => !dataElement.hide)
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
                        /*backgroundColor={
                            this.state.testFields
                                ? this.state.testFields[dataElement.id]
                                    ? this.getTestFieldColor(dataElement.id)
                                    : ''
                                : ''
                        }*/
                    />
                )}
            </Padding>
        )
    }

    render() {
        const { programStage } = this.state

        if (!programStage) return null

        const sections = programStage.programStageSections.filter(
            section => !section.hide
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
                            childSection => !childSection.hide
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
                                                {childSections
                                                    ? childSections.map(
                                                          childSection =>
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
            </MarginBottom>
        )
    }
}

export default withRouter(EventInformation)
/* eslint no-eval: 0 */

import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import { Card } from '@dhis2/ui/core'
import { Heading, Row, Title, Label } from '../../helpers/helpers'
import { getProgramStage, getOrganisms, updateEvent } from '../../api/api'
import {
    TextInput,
    RadioInput,
    SelectInput,
    SwitchInput,
    IconButton,
    CheckboxInput,
    DateInput,
} from '../../inputs'
import { Grid } from '@material-ui/core'
import { EntityButtons } from '../EntityButtons'

// Used for inputs with special handling.
const config = require('../../config/config.json')

export class Event extends Component {
    state = {
        programStage: null,
        backClicked: false,
        values: {},
    }

    componentDidMount = async () => {
        const { programStage, values } = await getProgramStage(
            this.props.match.params.orgUnit,
            this.props.match.params.amrId
                ? this.props.match.params.amrId
                : undefined
        )

        this.setState({
            programStage: programStage,
            organisms: await getOrganisms(),
            values: values,
        })
        console.log(values)
    }

    onChange = (name, value) => {
        let values = { ...this.state.values }
        values[name] = value
        this.setState({ values: values })
    }

    onBackClicked = () => {
        this.setState({ backClicked: true })
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
        await updateEvent(this.state.values)
    }

    getSpecialDataElement = dataElement => {
        switch (dataElement.code) {
            case 'organism':
                return (
                    <div key={dataElement.id} style={{ margin: 16 }}>
                        <SelectInput
                            objects={this.state.organisms}
                            name={dataElement.id}
                            label={dataElement.displayFormName}
                            value={this.state.values[dataElement.id]}
                            onChange={this.onChange}
                            required={dataElement.required}
                            disabled={dataElement.disabled}
                        />
                    </div>
                )
            case 'AMR Id':
                return (
                    <div key={dataElement.id} style={{ margin: 16 }}>
                        <TextInput
                            name={dataElement.id}
                            label={dataElement.displayFormName}
                            value={this.state.values[dataElement.id]}
                            required={dataElement.required}
                            onChange={this.onChange}
                            disabled={true}
                        />
                    </div>
                )
            default:
                return null
        }
    }

    getChildSection = childSection => {
        switch (childSection.name) {
            case 'Comorbidity':
                let objects = {}
                let values = {}
                for (let i = 0; i < childSection.dataElements.length; i++) {
                    if (
                        childSection.dataElements[i].valueType === 'TRUE_ONLY'
                    ) {
                        objects[childSection.dataElements[i].id] =
                            childSection.dataElements[i].displayFormName
                        values[childSection.dataElements[i].id] =
                            this.state.values[
                                childSection.dataElements[i].id
                            ] === true
                    }
                }
                return (
                    <div key={'Comorbidity'}>
                        <div style={{ margin: 16 }}>
                            <CheckboxInput
                                objects={objects}
                                name="Comorbidity"
                                label="Comorbidity"
                                values={values}
                                onChange={this.onChange}
                                required={true}
                            />
                        </div>
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
            case 'Antibiotics / Antifungals (Taken for 3 days in last 1 month)':
                return (
                    <div key={'Comorbidity'}>
                        <div style={{ margin: '16px 16px -16px 16px' }}>
                            <Label>
                                Antibiotics / Antifungals (Taken for 3 days in
                                last 1 month)
                            </Label>
                        </div>
                        {childSection.dataElements
                            .filter(dataElement => this.shouldShow(dataElement))
                            .map(dataElement =>
                                this.getDataElement(dataElement)
                            )}
                    </div>
                )
            default:
                return (
                    <Grid item xs key={childSection.name}>
                        <div style={{ margin: '16px 16px -16px 16px' }}>
                            <Label>{childSection.name}</Label>
                        </div>
                        {childSection.dataElements
                            .filter(dataElement => this.shouldShow(dataElement))
                            .map(dataElement =>
                                this.getDataElement(dataElement)
                            )}
                    </Grid>
                )
        }
    }

    getDataElement = dataElement => {
        return (
            <div key={dataElement.id} style={{ padding: 16 }}>
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
                        disabled={false}
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
                    />
                )}
            </div>
        )
    }

    shouldShow = element => {
        try {
            return element.hideCondition
                ? !this.evaluateAll(element.hideCondition)
                : true
        } catch {
            console.log('Evaluation failed:')
            console.log(element)
            return true
        }
    }

    evaluateAll = conditions => {
        for (let i = 0; i < conditions.length; i++)
            if (eval(conditions[i])) return true
        return false
    }

    render() {
        const { programStage, backClicked } = this.state

        if (!programStage) return null

        if (backClicked)
            return (
                <Redirect
                    push
                    to={
                        '/orgUnit/' +
                        this.props.match.params.orgUnit +
                        '/entity/' +
                        this.props.match.params.id
                    }
                />
            )

        let sections = programStage.programStageSections.filter(section =>
            this.shouldShow(section)
        )

        return (
            <div style={{ margin: 16 }}>
                <Row>
                    <IconButton
                        name="arrow_back"
                        icon="arrow_back"
                        onClick={this.onBackClicked}
                    />
                    <Title>{'Record'}</Title>
                </Row>
                {sections.map(section => {
                    let half = Math.ceil(
                        (section.dataElements.filter(dataElement =>
                            this.shouldShow(dataElement)
                        ).length +
                            (section.childSections
                                ? section.childSections.length
                                : 0)) /
                            2
                    )
                    let dataElements = section.dataElements.filter(
                        dataElement => this.shouldShow(dataElement)
                    )
                    return (
                        <div key={section.id} style={{ marginBottom: 16 }}>
                            <Card>
                                <div style={{ margin: 16 }}>
                                    <div
                                        style={{
                                            marginLeft: 8,
                                            marginRight: 8,
                                        }}
                                    >
                                        <Heading>{section.displayName}</Heading>
                                    </div>
                                    {dataElements.length > 0 ? (
                                        <Grid container spacing={0}>
                                            <Grid item xs>
                                                {dataElements
                                                    .slice(0, half)
                                                    .map(dataElement =>
                                                        config.eventForm.specialElements.includes(
                                                            dataElement.code
                                                        )
                                                            ? this.getSpecialDataElement(
                                                                  dataElement
                                                              )
                                                            : this.getDataElement(
                                                                  dataElement
                                                              )
                                                    )}
                                            </Grid>
                                            <Grid item xs>
                                                {dataElements
                                                    .slice(half)
                                                    .map(dataElement =>
                                                        config.eventForm.specialElements.includes(
                                                            dataElement.code
                                                        )
                                                            ? this.getSpecialDataElement(
                                                                  dataElement
                                                              )
                                                            : this.getDataElement(
                                                                  dataElement
                                                              )
                                                    )}
                                                {section.childSections
                                                    ? section.childSections.map(
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
                                            {section.childSections
                                                ? section.childSections.map(
                                                      childSection =>
                                                          this.getChildSection(
                                                              childSection
                                                          )
                                                  )
                                                : null}
                                        </Grid>
                                    )}
                                </div>
                            </Card>
                        </div>
                    )
                })}
                <EntityButtons buttons={this.getButtonProps()} />
            </div>
        )
    }
}

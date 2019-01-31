import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import { Card } from '@dhis2/ui/core'
import { Heading, Row, Title } from '../../helpers/helpers'
import { getProgramStage, getOrganisms } from '../../api/api'
import {
    TextInput,
    RadioInput,
    SelectInput,
    SwitchInput,
    IconButton,
    CheckboxInput,
} from '../../inputs'
import { Grid } from '@material-ui/core'

const config = require('../../config/config.json')

export class Event extends Component {
    state = {
        programStage: null,
        backClicked: false,
        values: {},
    }

    componentDidMount = async () => {
        let programStage = await getProgramStage()
        let values = {}
        for (let i = 0; i < programStage.programStageSections.length; i++) {
            for (
                let j = 0;
                j < programStage.programStageSections[i].dataElements.length;
                j++
            ) {
                values[
                    programStage.programStageSections[i].dataElements[j].id
                ] = ''
                if (
                    programStage.programStageSections[i].dataElements[j]
                        .optionSetValue
                ) {
                    let options = []
                    for (
                        let h = 0;
                        h <
                        programStage.programStageSections[i].dataElements[j]
                            .optionSet.options.length;
                        h++
                    )
                        options.push({
                            value:
                                programStage.programStageSections[i]
                                    .dataElements[j].optionSet.options[h].id,
                            label:
                                programStage.programStageSections[i]
                                    .dataElements[j].optionSet.options[h]
                                    .displayName,
                        })
                    programStage.programStageSections[i].dataElements[
                        j
                    ].optionSet.options = options
                }
            }
        }

        this.setState({
            programStage: programStage,
            organisms: await getOrganisms(),
        })
    }

    onChange = (name, value) => {
        let values = { ...this.state.values }
        values[name] = value
        this.setState({ values: values })
    }

    onBackClicked = () => {
        this.setState({ backClicked: true })
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
                    objects[childSection.dataElements[i].id] =
                        childSection.dataElements[i].displayFormName
                    values[childSection.dataElements[i].id] =
                        this.state.values[childSection.dataElements[i].id] ===
                        true
                }
                return (
                    <div key={'Comorbidity'} style={{ margin: 16 }}>
                        <CheckboxInput
                            objects={objects}
                            name="Comorbidity"
                            label="Comorbidity"
                            values={values}
                            onChange={this.onChange}
                            required={true}
                        />
                    </div>
                )
            default:
                return null
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
                        />
                    ) : (
                        <SelectInput
                            objects={dataElement.optionSet.options}
                            name={dataElement.id}
                            label={dataElement.displayFormName}
                            value={this.state.values[dataElement.id]}
                            onChange={this.onChange}
                            required={dataElement.required}
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
                    />
                ) : (
                    <TextInput
                        name={dataElement.id}
                        label={dataElement.displayFormName}
                        value={this.state.values[dataElement.id]}
                        required={dataElement.required}
                    />
                )}
            </div>
        )
    }

    render() {
        const { programStage, backClicked } = this.state

        if (!programStage) return null

        if (backClicked)
            return (
                <Redirect push to={'/entity/' + this.props.match.params.id} />
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
                {programStage.programStageSections.map(section => {
                    let half = Math.ceil(section.dataElements.length / 2)
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
                                    <Grid container spacing={0}>
                                        <Grid item xs>
                                            {section.dataElements
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
                                            {section.dataElements
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
                                        </Grid>
                                    </Grid>
                                    {section.childSections
                                        ? section.childSections.map(
                                              childSection =>
                                                  this.getChildSection(
                                                      childSection
                                                  )
                                          )
                                        : null}
                                </div>
                            </Card>
                        </div>
                    )
                })}
            </div>
        )
    }
}

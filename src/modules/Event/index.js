import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import { Card } from '@dhis2/ui/core'
import { Heading, Row, Title } from '../../helpers/helpers'
import { getProgramStage } from '../../api/api'
import {
    TextInput,
    RadioInput,
    SelectInput,
    SwitchInput,
    IconButton,
} from '../../inputs'

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

    render() {
        const { programStage, backClicked, values } = this.state

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
                {programStage.programStageSections.map(section => (
                    <div key={section.id} style={{ marginBottom: 16 }}>
                        <Card>
                            <div style={{ margin: 16 }}>
                                <div style={{ marginLeft: 8, marginRight: 8 }}>
                                    <Heading>{section.displayName}</Heading>
                                </div>
                                {section.dataElements.map(dataElement => (
                                    <div
                                        key={dataElement.id}
                                        style={{ margin: 8 }}
                                    >
                                        {dataElement.optionSetValue ? (
                                            dataElement.optionSet.options
                                                .length < 5 ? (
                                                <RadioInput
                                                    objects={
                                                        dataElement.optionSet
                                                            .options
                                                    }
                                                    name={dataElement.id}
                                                    label={
                                                        dataElement.displayFormName
                                                    }
                                                    value={
                                                        values[dataElement.id]
                                                    }
                                                    onChange={this.onChange}
                                                    required={
                                                        dataElement.required
                                                    }
                                                />
                                            ) : (
                                                <SelectInput
                                                    objects={
                                                        dataElement.optionSet
                                                            .options
                                                    }
                                                    name={dataElement.id}
                                                    label={
                                                        dataElement.displayFormName
                                                    }
                                                    value={
                                                        values[dataElement.id]
                                                    }
                                                    onChange={this.onChange}
                                                    required={
                                                        dataElement.required
                                                    }
                                                />
                                            )
                                        ) : dataElement.valueType ===
                                          'TRUE_ONLY' ? (
                                            <SwitchInput
                                                name={dataElement.id}
                                                label={
                                                    dataElement.displayFormName
                                                }
                                                checked={values[dataElement.id]}
                                                disabled={false}
                                                onChange={this.onChange}
                                                required={dataElement.required}
                                            />
                                        ) : (
                                            <TextInput
                                                name={dataElement.id}
                                                label={
                                                    dataElement.displayFormName
                                                }
                                                value={values[dataElement.id]}
                                                required={dataElement.required}
                                            />
                                        )}
                                    </div>
                                ))}
                            </div>
                        </Card>
                    </div>
                ))}
            </div>
        )
    }
}

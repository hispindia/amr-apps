import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import { Card, LinearProgress } from '@dhis2/ui/core'
import { Heading } from '../../helpers/helpers'
import { getProgramStage } from '../../api/api'
import { TextInput, RadioInput, SelectInput, SwitchInput } from '../../inputs'

export class Event extends Component {
    state = {
        loading: true,
        goToHome: false,
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
            loading: false,
        })
    }

    onChange = (name, value) => {
        let values = { ...this.state.values }
        values[name] = value
        this.setState({ values: values })
    }

    render() {
        const { loading, programStage, goToHome, values } = this.state

        if (goToHome) return <Redirect push to={'/'} />

        if (loading) return <LinearProgress />

        return (
            <div style={{ margin: 20 }}>
                {programStage.programStageSections.map(section => (
                    <div key={section.id} style={{ marginBottom: 16 }}>
                        <Card>
                            <div style={{ margin: 20 }}>
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

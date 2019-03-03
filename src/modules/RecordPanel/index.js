import React, { Component } from 'react'
import {
    Heading,
    Margin,
    Padding,
    MarginSides,
    MarginBottom,
} from '../../helpers/helpers'
import { SelectInput, RadioInput } from '../../inputs'
import { Card } from '@dhis2/ui/core/Card'
import { getPrograms, getOrganisms } from '../../api/api'
import { Grid } from '@material-ui/core'
import { ProgressSection } from '../'

/**
 * Contains event panal and/or event information.
 */
export class RecordPanel extends Component {
    state = {
        programs: null,
        programStages: null,
        organisms: null,
        values: {
            programId: '',
            programStageId: '',
            organismCode: '',
        },
    }

    componentDidMount = async () => {
        const { programs, programStages } = await getPrograms()
        this.setState({
            programs: programs,
            programStages: programStages,
        })
    }

    componentDidUpdate = prevProps => {
        if (this.props.resetSwitch !== prevProps.resetSwitch)
            this.setState({
                values: {
                    programId: '',
                    programStageId: '',
                    organismCode: '',
                },
            })
    }

    /**
     * Called when a new program is selected.
     */
    onProgramChange = async (name, value) => {
        const { programs, programStages } = this.state
        let values = {
            programId: value,
            programStageId:
                programStages[value].length > 1
                    ? ''
                    : programStages[value][0].value,
            organismCode: '',
        }
        this.setState({
            organisms: await getOrganisms(
                programs.find(program => program.value === value).label
            ),
            values: values,
        })
    }

    /**
     * Called when a new program stage or organism is selected.
     */
    onChange = (name, value) => {
        let values = { ...this.state.values }
        values[name] = value
        this.setState({ values: values })
        this.props.passValues(
            values.programId,
            values.programStageId,
            values.organismCode,
            !Object.values(values).includes('')
        )
    }

    /**
     * Gets the data elements to be rendered.
     * @returns {Object[]} Data elements.
     */
    getDataElements = () => {
        const { programs, programStages, organisms, values } = this.state

        let dataElements = [
            {
                id: 'programId',
                label: 'Organism group',
                objects: programs,
                onChange: this.onProgramChange,
            },
        ]
        if (values.programId && programStages[values.programId].length > 0)
            dataElements.push({
                id: 'programStageId',
                label: 'Type',
                objects: programStages[values.programId],
                onChange: this.onChange,
            })
        if (organisms)
            dataElements.push({
                id: 'organismCode',
                label: 'Organisms',
                objects: organisms,
                onChange: this.onChange,
            })

        return dataElements
    }

    /**
     * Gets the input component.
     * @param {Object} dataElement - Data element.
     * @returns {Component} Input component.
     */
    getInput = dataElement => {
        return (
            <Padding key={dataElement.id}>
                {dataElement.objects.length < 4 ? (
                    <RadioInput
                        objects={dataElement.objects}
                        name={dataElement.id}
                        label={dataElement.label}
                        value={this.state.values[dataElement.id]}
                        onChange={dataElement.onChange}
                        required
                    />
                ) : (
                    <SelectInput
                        objects={dataElement.objects}
                        name={dataElement.id}
                        label={dataElement.label}
                        value={this.state.values[dataElement.id]}
                        onChange={dataElement.onChange}
                        required
                    />
                )}
            </Padding>
        )
    }

    render() {
        const dataElements = this.getDataElements()
        const half = Math.ceil(dataElements.length / 2)

        if (!this.state.programs) return <ProgressSection />

        return !this.state.programs ? null : (
            <MarginBottom>
                <MarginBottom>
                    <Card>
                        <Margin>
                            <MarginSides>
                                <Heading>Panel</Heading>
                            </MarginSides>
                            <Grid container spacing={0}>
                                <Grid item xs>
                                    {dataElements
                                        .slice(0, half)
                                        .map(dataElement =>
                                            this.getInput(dataElement)
                                        )}
                                </Grid>
                                <Grid item xs>
                                    {dataElements
                                        .slice(half)
                                        .map(dataElement =>
                                            this.getInput(dataElement)
                                        )}
                                </Grid>
                            </Grid>
                        </Margin>
                    </Card>
                </MarginBottom>
            </MarginBottom>
        )
    }
}

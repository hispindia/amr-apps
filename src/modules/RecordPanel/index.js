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
import { Grid } from '@material-ui/core'

/**
 * Contains event panal and/or event information.
 */
export class RecordPanel extends Component {
    state = {
        organisms: null,
        values: {}
    }

    componentDidMount = () => {
        const values = this.props.values
        this.setState({
            organisms: values.programId ? this.getOrganisms(values.programId) : null,
            values: {
                programId: values.programId ? values.programId : '',
                programStageId: values.programStageId ? values.programStageId : '',
                organismCode: values.organism ? values.organism: ''
            }
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

    getOrganisms = programId => {
        let organisms = []
        this.props.optionSets[this.props.programOrganisms[programId]].forEach(o => {
            if (!organisms.find(org => org.value === o.value))
                organisms.push(o)
        })
        return organisms
    }

    /**
     * Called when a new program is selected.
     */
    onProgramChange = async (name, value) => {
        const { programStages } = this.props
        let values = {
            programId: value,
            programStageId:
                programStages[value].length > 1
                    ? ''
                    : programStages[value][0].value,
            organismCode: '',
        }

        this.setState({
            organisms: this.getOrganisms(value),
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
        this.props.passValues({
            programId: values.programId,
            programStageId: values.programStageId,
            organism: values.organismCode,
            valid: !Object.values(values).includes('')
        })
    }

    /**
     * Gets the data elements to be rendered.
     * @returns {Object[]} Data elements.
     */
    getDataElements = () => {
        const { programs, programStages } = this.props
        const { organisms, values } = this.state

        let dataElements = [
            {
                id: 'programId',
                label: 'Organism group',
                objects: programs,
                onChange: this.onProgramChange,
            },
        ]
        if (values.programId && programStages[values.programId].length > 1)
            dataElements.push({
                id: 'programStageId',
                label: 'Type',
                objects: programStages[values.programId],
                onChange: this.onChange,
            })
        if (organisms)
            dataElements.push({
                id: 'organismCode',
                label: 'Organism',
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
                        disabled={this.props.disabled}
                        required
                    />
                ) : (
                    <SelectInput
                        objects={dataElement.objects}
                        name={dataElement.id}
                        label={dataElement.label}
                        value={this.state.values[dataElement.id]}
                        onChange={dataElement.onChange}
                        disabled={this.props.disabled}
                        required
                    />
                )}
            </Padding>
        )
    }

    render() {
        const dataElements = this.getDataElements()
        const half = Math.ceil(dataElements.length / 2)

        return (
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

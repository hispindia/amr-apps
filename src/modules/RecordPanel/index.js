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
        organisms: '',
        programId: ''
    }

    componentDidMount = () => {
        const { programId, programStageId, organism } = this.props
        this.setState({
            organisms: programId ? this.getOrganisms(programId) : null,
            programId: programId ? programId : '',
            programStageId: programStageId ? programStageId : '',
            organism: organism ? organism : '',
        })
    }

    componentDidUpdate = prevProps => {
        if (this.props.resetSwitch !== prevProps.resetSwitch)
            this.setState({
                programId: '',
                programStageId: '',
                organism: '',
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
        this.onNewValues({
            organisms: this.getOrganisms(value),
            programId: value,
            programStageId:
                programStages[value].length > 1
                    ? ''
                    : programStages[value][0].value,
            organism: '',
        })
    }

    /**
     * Called when a new program stage or organism is selected.
     */
    onChange = (name, value) => {
        let values = {...this.state}
        values[name] = value
        this.onNewValues(values)
    }

    onNewValues = values => {
        this.setState(values)
        this.props.passValues({
            programId: values.programId,
            programStageId: values.programStageId,
            organism: values.organism,
            valid: !Object.values(values).includes('')
        })
    }

    /**
     * Gets the data elements to be rendered.
     * @returns {Object[]} Data elements.
     */
    getDataElements = () => {
        const { programs, programStages } = this.props
        const { programId, organisms } = this.state

        let dataElements = [
            {
                id: 'programId',
                label: 'Organism group',
                objects: programs,
                onChange: this.onProgramChange,
            },
        ]
        if (programId && programStages[programId].length > 1)
            dataElements.push({
                id: 'programStageId',
                label: 'Type',
                objects: programStages[programId],
                onChange: this.onChange,
            })
        if (organisms)
            dataElements.push({
                id: 'organism',
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
                        value={this.state[dataElement.id]}
                        onChange={dataElement.onChange}
                        disabled={this.props.disabled}
                        required
                    />
                ) : (
                    <SelectInput
                        objects={dataElement.objects}
                        name={dataElement.id}
                        label={dataElement.label}
                        value={this.state[dataElement.id]}
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

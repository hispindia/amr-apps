import React, { Component } from 'react'
import { Card } from '@dhis2/ui/core/Card'
import { Grid } from '@material-ui/core'
import { Heading, Margin, MarginBottom, Padding } from 'styles'
import { SelectInput, RadioInput, DateInput } from 'inputs'

/**
 * Contains event panal and/or event information.
 */
export class RecordPanel extends Component {
    state = {
        organisms: '',
        programId: '',
    }

    componentDidMount = () => {
        const { programId, programStageId, organism, sampleDate } = this.props
        this.setState({
            organisms: programId ? this.getOrganisms(programId) : null,
            programId: programId ? programId : '',
            programStageId: programStageId ? programStageId : '',
            organism: organism ? organism : '',
            sampleDate: sampleDate ? sampleDate : '',
        })
    }

    componentDidUpdate = prevProps => {
        if (this.props.resetSwitch !== prevProps.resetSwitch)
            this.setState({
                programId: '',
                programStageId: '',
                organism: '',
                sampleDate: '',
            })
    }

    getOrganisms = programId => {
        let organisms = []
        this.props.optionSets[this.props.programOrganisms[programId]].forEach(
            o => {
                if (!organisms.find(org => org.value === o.value))
                    organisms.push(o)
            }
        )
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
            sampleDate: '',
        })
    }

    /**
     * Called when a new program stage or organism is selected.
     */
    onChange = (name, value) => {
        let values = { ...this.state }
        values[name] = value
        this.onNewValues(values)
    }

    onNewValues = values => {
        this.setState(values)
        this.props.passValues({
            programId: values.programId,
            programStageId: values.programStageId,
            organism: values.organism,
            sampleDate: values.sampleDate,
            valid: !Object.values(values).includes(''),
        })
    }

    /**
     * Gets the data elements to be rendered.
     * @returns {Object[]} Data elements.
     */
    getDataElement = id => {
        const { programs, programStages } = this.props
        const { programId, organisms } = this.state

        switch (id) {
            case 'programId':
                return this.getInput({
                    id: 'programId',
                    label: 'Organism group',
                    objects: programs,
                    onChange: this.onProgramChange,
                })
            case 'programStageId':
                return this.getInput({
                    id: 'programStageId',
                    label: 'Type',
                    objects: programStages[programId],
                    onChange: this.onChange,
                })
            case 'organism':
                return this.getInput({
                    id: 'organism',
                    label: 'Organism',
                    objects: organisms,
                    onChange: this.onChange,
                })
            case 'sampleDate':
                return this.getInput({
                    id: 'sampleDate',
                    label: 'Date of Sample',
                    onChange: this.onChange,
                })
            default:
                return
        }
    }

    /**
     * Gets the input component.
     * @param {Object} dataElement - Data element.
     * @returns {Component} Input component.
     */
    getInput = dataElement => {
        return (
            <Padding key={dataElement.id}>
                {!dataElement.objects ? (
                    <DateInput
                        name={dataElement.id}
                        label={dataElement.label}
                        value={this.state[dataElement.id]}
                        onChange={dataElement.onChange}
                        disabled={this.props.disabled}
                        required
                    />
                ) : dataElement.objects.length < 4 ? (
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
        const { programStages } = this.props
        const { programId, organisms, organism } = this.state
        return (
            <MarginBottom>
                <Card>
                    <Margin>
                        <Heading>Panel</Heading>
                        <Grid container spacing={0}>
                            <Grid item xs>
                                {this.getDataElement('programId')}
                                {programId &&
                                    programStages[programId].length > 1 &&
                                    this.getDataElement('programStageId')}
                            </Grid>
                            <Grid item xs>
                                {organisms && this.getDataElement('organism')}
                                {organism && this.getDataElement('sampleDate')}
                            </Grid>
                        </Grid>
                    </Margin>
                </Card>
            </MarginBottom>
        )
    }
}

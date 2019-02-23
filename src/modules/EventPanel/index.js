import React, { Component } from 'react'
import {
    Heading,
    Margin,
    Padding,
    MarginSides,
    MarginBottom,
} from '../../helpers/helpers'
import { SelectInput } from '../../inputs'
import { Card } from '@dhis2/ui/core/Card'
import { getPrograms, getOrganisms } from '../../api/api'
import { Grid } from '@material-ui/core'

export class EventPanel extends Component {
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

    onChange = (name, value) => {
        let values = { ...this.state.values }
        values[name] = value
        this.setState({ values: values })
        if (!Object.values(values).includes('')) this.props.onPanel(values)
    }

    render() {
        const { programs, programStages, organisms, values } = this.state

        return !programs ? null : (
            <MarginBottom>
                <MarginBottom>
                    <Card>
                        <Margin>
                            <MarginSides>
                                <Heading>Panel</Heading>
                            </MarginSides>
                            <Grid container spacing={0}>
                                <Grid item xs>
                                    <Padding>
                                        <SelectInput
                                            objects={programs}
                                            name={'programId'}
                                            label={'Organism group'}
                                            value={values.programId}
                                            onChange={this.onProgramChange}
                                            required
                                        />
                                    </Padding>
                                    {values.programId &&
                                        programStages[values.programId].length >
                                            1 && (
                                            <Padding>
                                                <SelectInput
                                                    objects={
                                                        programStages[
                                                            values.programId
                                                        ]
                                                    }
                                                    name={'programStageId'}
                                                    label={'Type'}
                                                    value={
                                                        values.programStageId
                                                    }
                                                    onChange={this.onChange}
                                                    required
                                                />
                                            </Padding>
                                        )}
                                </Grid>
                                <Grid item xs>
                                    {organisms && (
                                        <Padding>
                                            <SelectInput
                                                objects={organisms}
                                                name={'organismCode'}
                                                label={'Organism'}
                                                value={values.organismCode}
                                                onChange={this.onChange}
                                                required
                                            />
                                        </Padding>
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

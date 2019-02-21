import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import {
    Heading,
    Row,
    Title,
    Margin,
    Padding,
    MarginSides,
    MarginBottom,
} from '../../helpers/helpers'
import { SelectInput } from '../../inputs'
import IconButton from '../../inputs/IconButton'
import { Card } from '@dhis2/ui/core/Card'
import { getPrograms, getOrganisms } from '../../api/api'
import { Grid } from '@material-ui/core'

export class EventPanel extends Component {
    state = {
        programs: null,
        programStages: null,
        organisms: null,
        program: '',
        programStage: '',
        organism: '',
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
        this.setState({
            program: value,
            programStage: programStages.length > 1 ? '' : programStages[0],
            organisms: await getOrganisms(
                programs.find(program => program.value === value).label
            ),
            organism: '',
        })
    }

    onChange = (name, value) => {
        this.setState({ [name]: value })
    }

    render() {
        const {
            programs,
            programStages,
            organisms,
            program,
            programStage,
            organism,
        } = this.state

        return !programs ? null : (
            <Margin>
                <Row>
                    <IconButton
                        name="arrow_back"
                        icon="arrow_back"
                        onClick={this.onBackClicked}
                    />
                    <Title>{'Record'}</Title>
                </Row>
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
                                            name={'program'}
                                            label={'Organism group'}
                                            value={this.state.program}
                                            onChange={this.onProgramChange}
                                            required
                                        />
                                    </Padding>
                                    {program &&
                                        programStages[program].length > 1 && (
                                            <Padding>
                                                <SelectInput
                                                    objects={
                                                        programStages[program]
                                                    }
                                                    name={'programStage'}
                                                    label={'Type'}
                                                    value={programStage}
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
                                                name={'organism'}
                                                label={'Organism'}
                                                value={organism}
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
            </Margin>
        )
    }
}

export default withRouter(EventPanel)

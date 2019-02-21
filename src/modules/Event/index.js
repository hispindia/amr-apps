import React, { Component } from 'react'
import { EventPanel } from '../EventPanel'
import EventInformation from '../EventInformation'
import { Margin, Row, Title } from '../../helpers/helpers'
import IconButton from '../../inputs/IconButton'

export class Event extends Component {
    state = {
        programId: null,
        programStageId: null,
        organismCode: null,
    }

    onPanel = values => {
        this.setState(values)
    }

    render() {
        const { programId, programStageId, organismCode } = this.state

        return (
            <Margin>
                <Row>
                    <IconButton
                        name="arrow_back"
                        icon="arrow_back"
                        onClick={this.onBackClicked}
                    />
                    <Title>{'Record'}</Title>
                </Row>
                {!this.props.match.params.event && (
                    <EventPanel onPanel={this.onPanel} />
                )}
                {(programId || this.props.match.params.event) && (
                    <EventInformation
                        programId={programId}
                        programStageId={programStageId}
                        organismCode={organismCode}
                    />
                )}
            </Margin>
        )
    }
}

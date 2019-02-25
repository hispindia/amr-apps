import React, { Component } from 'react'
import { Margin } from '../../helpers/helpers'
import EntityInformation from '../EntityInformation'
import TitleRow from '../TitleRow'
import EventInformation from '../EventInformation'
import { EventPanel } from '../EventPanel'

export class Record extends Component {
    state = {
        entityValues: null,
        panelValues: null,
    }

    onValidEntityValues = values => this.setState({ entityValues: values })

    onPanel = values => this.setState({ panelValues: values })

    render() {
        const { entityValues, panelValues } = this.state

        return (
            <Margin>
                <TitleRow title="Record" backPath="/" />
                <EntityInformation onValidValues={this.onValidEntityValues} />
                {entityValues && <EventPanel onPanel={this.onPanel} />}
                {panelValues && (
                    <EventInformation
                        programId={panelValues.programId}
                        programStageId={panelValues.programStageId}
                        organismCode={panelValues.organismCode}
                    />
                )}
            </Margin>
        )
    }
}

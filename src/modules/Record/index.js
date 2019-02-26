import React, { Component } from 'react'
import { Margin } from '../../helpers/helpers'
import EntityInformation from '../EntityInformation'
import TitleRow from '../TitleRow'
import EventInformation from '../EventInformation'
import { EventPanel } from '../EventPanel'
import { EntityButtons } from '../EntityButtons'
import { addEvent } from '../../api/api'

export class Record extends Component {
    state = {
        entityValues: null,
        panelValues: null,
        eventValues: null,
    }

    onValidEntityValues = (values, entityId) =>
        this.setState({
            entityValues: values,
            entityId: entityId ? entityId : null,
        })

    onPanel = values => this.setState({ panelValues: values })

    onValidEventValues = values => this.setState({ eventValues: values })

    onSubmitClick = async () => {
        const { entityValues, panelValues, eventValues, entityId } = this.state
        await addEvent(
            eventValues,
            panelValues.programId,
            panelValues.programStageId,
            this.props.match.params.orgUnit,
            entityValues,
            entityId
        )
    }

    render() {
        const { entityValues, panelValues, eventValues } = this.state

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
                        onValidValues={this.onValidEventValues}
                    />
                )}
                {eventValues && (
                    <EntityButtons
                        buttons={[
                            {
                                label: 'Submit',
                                onClick: this.onSubmitClick,
                                disabled: false,
                                icon: 'done',
                                kind: 'primary',
                            },
                        ]}
                    />
                )}
            </Margin>
        )
    }
}

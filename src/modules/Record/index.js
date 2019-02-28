import React, { Component } from 'react'
import { Margin } from '../../helpers/helpers'
import EntityInformation from '../EntityInformation'
import TitleRow from '../TitleRow'
import EventInformation from '../EventInformation'
import { EventPanel } from '../EventPanel'
import { addEvent } from '../../api/api'
import { ButtonRow } from '../../inputs'

export class Record extends Component {
    state = {
        entityValues: null,
        panelValues: null,
        eventValues: null,
        entityId: null,
        eventId: null,
        buttonDisabled: true,
        initialized: false,
        resetPanelValues: false,
    }

    componentDidMount = () => {
        this.setState({
            eventId: this.props.match.params.event
                ? this.props.match.params.event
                : null,
            initialized: true,
        })
    }

    onValidEntityValues = (values, entityId) =>
        this.setState({
            entityValues: values,
            entityId: entityId ? entityId : null,
        })

    onPanel = values => this.setState({ panelValues: values })

    onValidEventValues = values =>
        this.setState({ eventValues: values, buttonDisabled: false })

    onSubmitClick = async addMore => {
        this.setState({ buttonDisabled: true })
        const { entityValues, panelValues, eventValues, entityId } = this.state
        const { amrId, newEntityId } = await addEvent(
            eventValues,
            panelValues.programId,
            panelValues.programStageId,
            this.props.match.params.orgUnit,
            entityValues,
            entityId
        )
        window.alert(`AMR Id: ${amrId}`)
        console.log(newEntityId)

        if (addMore)
            this.setState({
                entityId: newEntityId,
                panelValues: null,
                eventValues: null,
                resetPanelValues: true,
            })
        else this.props.history.push('/')
    }

    sections = () => {
        const {
            entityValues,
            entityId,
            panelValues,
            eventId,
            buttonDisabled,
            resetPanelValues,
        } = this.state

        return (
            <div>
                {!eventId && (
                    <EntityInformation
                        onValidValues={this.onValidEntityValues}
                        entityId={entityId}
                    />
                )}
                {entityValues && (
                    <EventPanel
                        reset={resetPanelValues}
                        onPanel={this.onPanel}
                    />
                )}
                {(eventId || panelValues) && (
                    <EventInformation
                        eventId={eventId}
                        panelValues={panelValues}
                        onValidValues={this.onValidEventValues}
                    />
                )}
                {!eventId && (
                    <ButtonRow
                        buttons={[
                            {
                                label: 'Cancel',
                                onClick: () => this.props.history.push('/'),
                                disabled: false,
                                icon: 'clear',
                                kind: 'destructive',
                                tooltip: 'Cancel and go back.',
                                disabledTooltip: 'A required field is empty.',
                            },
                            {
                                label: 'Submit and add new',
                                onClick: () => this.onSubmitClick(true),
                                disabled: buttonDisabled,
                                icon: 'add',
                                kind: 'primary',
                                tooltip:
                                    'Submit record and add new record for the same person.',
                                disabledTooltip: 'A required field is empty.',
                            },
                            {
                                label: 'Submit',
                                onClick: () => this.onSubmitClick(false),
                                disabled: buttonDisabled,
                                icon: 'done',
                                kind: 'primary',
                                tooltip: 'Submit record.',
                                disabledTooltip: 'A required field is empty.',
                            },
                        ]}
                    />
                )}
            </div>
        )
    }

    render() {
        return (
            <Margin>
                <TitleRow title="Record" backPath="/" />
                {this.state.initialized && this.sections()}
            </Margin>
        )
    }
}

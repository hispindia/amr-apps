import React, { Component } from 'react'
import { Margin } from 'helpers'
import { PersonForm, RecordForm, RecordPanel, TitleRow } from 'modules'
import { addEvent, addPersonWithEvent } from 'api'
import { ButtonRow } from 'inputs'

export class RecordSections extends Component {
    state = {
        entityValues: null,
        entityValid: false,
        panelValues: null,
        panelValid: false,
        eventValues: null,
        eventValid: false,
        entityId: null,
        eventId: null,
        buttonDisabled: true,
        initialized: false,
        resetSwitch: false,
    }

    componentDidMount = () => {
        this.setState({
            eventId: this.props.match.params.event
                ? this.props.match.params.event
                : null,
            initialized: true,
        })
    }

    onEntityValues = (values, entityId, valid) =>
        this.setState({
            entityValues: values,
            entityId: entityId ? entityId : null,
            entityValid: valid,
        })

    onPanelValues = (values, valid) =>
        this.setState({ panelValues: values, panelValid: valid })

    onEventValues = (values, valid) =>
        this.setState({
            eventValues: values,
            eventValid: valid,
            buttonDisabled: false,
        })

    onSubmitClick = async addMore => {
        this.setState({ buttonDisabled: true })
        const {
            entityValues,
            panelValues,
            eventValues,
            entityId,
            resetSwitch,
        } = this.state
        const orgUnitId = this.props.match.params.orgUnit
        let amrId
        let newEntityId
        if (entityId)
            amrId = await addEvent(
                eventValues,
                panelValues.programId,
                panelValues.programStageId,
                orgUnitId,
                entityId
            )
        else {
            const values = await addPersonWithEvent(
                eventValues,
                panelValues.programId,
                panelValues.programStageId,
                orgUnitId,
                entityValues
            )
            amrId = values.amrId
            newEntityId = values.entityId
        }
        window.alert(`AMR Id: ${amrId}`)

        if (addMore)
            this.setState({
                entityId: newEntityId ? newEntityId : entityId,
                panelValid: false,
                eventValid: false,
                resetSwitch: !resetSwitch,
            })
        else this.props.history.push('/')
    }

    sections = () => {
        const {
            entityId,
            entityValid,
            panelValues,
            panelValid,
            eventId,
            eventValid,
            buttonDisabled,
            resetSwitch,
        } = this.state
        const disabled =
            buttonDisabled || !entityValid || !panelValid || !eventValid

        return (
            <div>
                {!eventId && (
                    <PersonForm
                        passValues={this.onEntityValues}
                        entityId={entityId}
                    />
                )}
                {entityValid && (
                    <RecordPanel
                        resetSwitch={resetSwitch}
                        passValues={this.onPanelValues}
                    />
                )}
                {(eventId || panelValid) && (
                    <RecordForm
                        eventId={eventId}
                        panelValues={panelValues}
                        passValues={this.onEventValues}
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
                                disabled: disabled,
                                icon: 'add',
                                kind: 'primary',
                                tooltip:
                                    'Submit record and add new record for the same person.',
                                disabledTooltip: 'A required field is empty.',
                            },
                            {
                                label: 'Submit',
                                onClick: () => this.onSubmitClick(false),
                                disabled: disabled,
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
                <TitleRow
                    title="Record"
                    backPath="/"
                    history={this.props.history}
                />
                {this.state.initialized && this.sections()}
            </Margin>
        )
    }
}

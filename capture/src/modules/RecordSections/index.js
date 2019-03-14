import React, { Component } from 'react'
import { Margin } from 'helpers'
import {
    PersonForm,
    RecordForm,
    RecordPanel,
    TitleRow,
    ProgressSection,
} from 'modules'
import {
    addEvent,
    addPersonWithEvent,
    getProgramStageNew,
    getProgramStageExisting,
    updateEvent,
    deleteEvent,
    updateEventValue,
    setEventStatus
} from 'api'
import { ButtonRow } from 'inputs'

export class RecordSections extends Component {
    state = {
        entityValues: null,
        entityValid: false,
        panelValid: false,
        eventValues: null,
        eventValid: false,
        entityId: null,
        eventId: null,
        buttonDisabled: true,
        initialized: false,
        loading: true,
        resetSwitch: false,
        recordProps: null,
        deletable: false,
    }

    componentDidMount = async () => {
        const eventId = this.props.match.params.event
            ? this.props.match.params.event
            : null
        let recordProps = eventId
            ? await getProgramStageExisting(eventId)
            : null
        if (recordProps) recordProps.eventId = eventId
        this.setState({
            recordProps: recordProps,
            eventId: eventId,
            initialized: true,
            loading: false,
        })
    }

    onEntityValues = (values, entityId, valid) =>
        this.setState({
            entityValues: values,
            entityId: entityId ? entityId : null,
            entityValid: valid,
        })

    onPanelValues = async (programId, programStageId, organismCode, valid) => {
        if (valid)
            this.setState({
                loading: true,
                recordProps: null,
                disablePanel: true,
            })
        this.setState({
            programId: programId,
            programStageId: programStageId,
            organismCode: organismCode,
            panelValid: valid,
            recordProps: valid
                ? await getProgramStageNew(
                    programId,
                    programStageId,
                    organismCode,
                    this.props.match.params.orgUnit,
                    this.state.entityId,
                    this.state.entityValues
                )
                : null,
            loading: false,
            disablePanel: false,
        })
    }

    onEventValues = (valid, deletable) =>
        this.setState({
            eventValid: valid,
            buttonDisabled: false,
            deletable: deletable,
        })

    onSubmitClick = async addMore => {
        this.setState({ buttonDisabled: true })
        const { recordProps, resetSwitch } = this.state
        await setEventStatus(recordProps.eventId, true)

        if (addMore)
            this.setState({
                panelValid: false,
                recordProps: null,
                eventValid: false,
                resetSwitch: !resetSwitch,
            })
        else this.props.history.push('/')
    }

    onDelete = async () => {
        await deleteEvent(this.state.eventId)
        this.props.history.push('/')
    }

    sections = () => {
        const {
            entityId,
            entityValid,
            panelValid,
            disablePanel,
            eventId,
            eventValid,
            buttonDisabled,
            resetSwitch,
            recordProps,
            loading,
            deletable,
        } = this.state
        const disabled =
            (!eventId &&
                (buttonDisabled ||
                    !entityValid ||
                    !panelValid ||
                    !eventValid)) ||
            (eventId && !eventValid)

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
                        disabled={disablePanel}
                    />
                )}
                {recordProps && (
                    <RecordForm
                        passValues={this.onEventValues}
                        programStage={recordProps.programStage}
                        rules={recordProps.rules}
                        values={recordProps.values}
                        eventId={recordProps.eventId}
                    />
                )}
                {loading && <ProgressSection />}
                <ButtonRow
                    buttons={
                        eventId
                            ? [
                                  {
                                      label: 'Delete',
                                      onClick: this.onDelete,
                                      disabled: !deletable,
                                      icon: 'delete',
                                      kind: 'destructive',
                                      tooltip: 'Permanently delete record.',
                                      disabledTooltip:
                                          'You cannot delete records with an approval status.',
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
                              ]
                            : [
                                  {
                                      label: 'Submit and add new',
                                      onClick: () => this.onSubmitClick(true),
                                      disabled: disabled,
                                      icon: 'add',
                                      kind: 'primary',
                                      tooltip:
                                          'Submit record and add new record for the same person.',
                                      disabledTooltip:
                                          'A required field is empty.',
                                  },
                                  {
                                      label: 'Submit',
                                      onClick: () => this.onSubmitClick(false),
                                      disabled: disabled,
                                      icon: 'done',
                                      kind: 'primary',
                                      tooltip: 'Submit record.',
                                      disabledTooltip:
                                          'A required field is empty.',
                                  },
                              ]
                    }
                />
            </div>
        )
    }

    render() {
        const { initialized } = this.state
        return (
            <Margin>
                <TitleRow
                    title="Record"
                    backPath="/"
                    history={this.props.history}
                />
                {initialized ? this.sections() : <ProgressSection />}
            </Margin>
        )
    }
}

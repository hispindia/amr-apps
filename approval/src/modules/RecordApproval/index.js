import React, { Component } from 'react'
import { Margin } from 'helpers'
import { RecordForm, TitleRow, ProgressSection } from 'modules'
import { getRecordForApproval, setEventStatus, deleteEvent } from 'api'
import { ButtonRow } from 'inputs'

export class RecordApproval extends Component {
    state = {
        eventValid: false,
        eventId: null,
        buttonDisabled: true,
        initialized: false,
        loading: true,
        recordProps: null,
        deletable: false,
    }

    componentDidMount = async () => {
        const eventId = this.props.match.params.event
            ? this.props.match.params.event
            : null
         let recordProps = eventId
            ? await getRecordForApproval(eventId)
            : null
        this.setState({
            recordProps: recordProps,
            eventId: eventId,
            initialized: true,
            loading: false,
        })
    }

    onEventValues = valid =>
        this.setState({
            eventValid: valid,
            buttonDisabled: false
        })

    onSubmitClick = async () => {
        this.setState({ buttonDisabled: true })
        await setEventStatus(this.state.recordProps.eventId, true)
        this.props.history.push('/')
    }

    onEditClick = async () => {
        this.setState({ buttonDisabled: true })
        await setEventStatus(this.state.recordProps.eventId)
        let recordProps = {...this.state.recordProps}
        recordProps.completed = false
        this.setState({
            buttonDisabled: false,
            recordProps: recordProps
        })
    }

    onDelete = async () => {
        if (window.confirm('Are you sure you want to permanently delete the record?')) {
            await deleteEvent(this.state.eventId)
            this.props.history.push('/')
        }
    }

    sections = () => {
        const {
            eventValid,
            buttonDisabled,
            recordProps,
            loading,
            deletable,
        } = this.state
        const disabled = buttonDisabled || !eventValid

        return (
            <div>
                {recordProps && (
                    <RecordForm
                        passValues={this.onEventValues}
                        programStage={recordProps.programStage}
                        rules={recordProps.rules}
                        values={recordProps.eventValues}
                        eventId={recordProps.eventId}
                        completed={recordProps.completed}
                    />
                )}
                {loading && <ProgressSection />}
                <ButtonRow
                    buttons={[
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
                            label: recordProps.completed ? 'Edit' : 'Submit',
                            onClick: () => recordProps.completed ? this.onEditClick() : this.onSubmitClick(false),
                            disabled: recordProps.completed ? !recordProps.programStage.deletable : disabled,
                            icon: recordProps.completed ? 'edit' : 'done',
                            kind: 'primary',
                            tooltip: recordProps.completed ? 'Edit record' : 'Submit record.',
                            disabledTooltip: 'A required field is empty.',
                        },
                    ]}
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

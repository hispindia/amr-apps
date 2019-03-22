import React, { Component } from 'react'
import { Margin } from 'helpers'
import { RecordForm, TitleRow, ProgressSection } from 'modules'
import { getRecordForApproval, setEventStatus, deleteEvent } from 'api'
import { ButtonRow } from 'inputs'

export class RecordApproval extends Component {
    state = {
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
        if (recordProps) recordProps.eventId = eventId
        this.setState({
            recordProps: recordProps,
            eventId: eventId,
            initialized: true,
            loading: false,
            buttonDisabled: false
        })
    }

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
            buttonDisabled,
            recordProps,
            loading,
            deletable,
        } = this.state

        return (
            <div>
                {recordProps && (
                    <RecordForm
                        programStage={recordProps.programStage}
                        rules={recordProps.rules}
                        values={recordProps.eventValues}
                        eventId={recordProps.eventId}
                        storedBy={recordProps.storedBy}
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
                            disabled: buttonDisabled,
                            icon: recordProps.completed ? 'edit' : 'done',
                            kind: 'primary',
                            tooltip: recordProps.completed ? 'Edit record' : 'Submit record.',
                            disabledTooltip: recordProps.completed ? 'Records with this approval status cannot be edited.' : 'A required field is empty.',
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

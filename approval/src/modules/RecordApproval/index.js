import React, { Component } from 'react'
import { Margin } from 'helpers'
import { RecordForm, TitleRow, ProgressSection } from 'modules'
import { getRecordForApproval, updateEvent, deleteEvent } from 'api'
import { ButtonRow } from 'inputs'

export class RecordApproval extends Component {
    state = {
        eventValues: null,
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
        this.setState({
            recordProps: eventId ? await getRecordForApproval(eventId) : null,
            eventId: eventId,
            initialized: true,
            loading: false,
        })
    }

    onEventValues = (values, valid, deletable) =>
        this.setState({
            eventValues: values,
            eventValid: valid,
            buttonDisabled: false,
            deletable: deletable,
        })

    onSubmitClick = async () => {
        this.setState({ buttonDisabled: true })
        const { eventId, eventValues } = this.state
        await updateEvent(eventValues, eventId, true)
        this.props.history.push('/')
    }

    onDelete = async () => {
        await deleteEvent(this.state.eventId)
        this.props.history.push('/')
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
                        values={recordProps.values}
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
                            label: 'Submit',
                            onClick: this.onSubmitClick,
                            disabled: disabled,
                            icon: 'done',
                            kind: 'primary',
                            tooltip: 'Submit changes.',
                            disabledTooltip: 'Record is unchanged.',
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

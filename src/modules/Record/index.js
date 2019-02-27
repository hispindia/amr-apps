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
        entityId: null,
        buttonDisabled: true,
    }

    onValidEntityValues = (values, entityId) =>
        this.setState({
            entityValues: values,
            entityId: entityId ? entityId : null,
        })

    onPanel = values => this.setState({ panelValues: values })

    onValidEventValues = values =>
        this.setState({ eventValues: values, buttonDisabled: false })

    onSubmitClick = async () => {
        this.setState({ buttonDisabled: true })
        const { entityValues, panelValues, eventValues, entityId } = this.state
        const amrId = await addEvent(
            eventValues,
            panelValues.programId,
            panelValues.programStageId,
            this.props.match.params.orgUnit,
            entityValues,
            entityId
        )
        window.alert(`AMR Id: ${amrId}`)
    }

    render() {
        const { entityValues, panelValues, buttonDisabled } = this.state

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
                <EntityButtons
                    buttons={[
                        {
                            label: 'Submit',
                            onClick: this.onSubmitClick,
                            disabled: buttonDisabled,
                            icon: 'done',
                            kind: 'primary',
                            tooltip: 'Submit record.',
                            disabledTooltip: 'A required field is empty.',
                        },
                    ]}
                />
            </Margin>
        )
    }
}

import React, { useState, useEffect } from 'react'
import {
    PersonForm,
    RecordForm,
    RecordPanel,
    TitleRow,
    ProgressSection,
} from '../'
import {
    deleteEvent,
    setEventStatus,
    newRecord,
    existingRecord,
    _organismsDataElementId,
    ButtonRow,
    Margin
} from '../../'

export const RecordSections = props => {
    const { optionSets, person, programs, programList, stageLists, programOrganisms } = props.metadata
    const event = props.match.params.event

    const [loading, setLoading] = useState(false) 
    const [entity, setEntity] = useState({
        values: person.values,
        id: null,
        valid: false,
    })
    const [panel, setPanel] = useState({
        programId: null,
        programStageId: null,
        organism: null,
        valid: false,
    })
    const [eventValid, setEventValid] = useState(false)
    const [eventData, setEventData] = useState(null)
    const [resetSwitch, setResetSwitch] = useState(false)
    const [buttonDisabled, setButtonDisabled] = useState(false)

    useEffect(() => {
        const getNewRecord = async () => {
            setLoading(true)
            const data = await newRecord(
                panel.programId,
                programs.find(p => p.id === panel.programId).programStages
                    .find(s => s.id === panel.programStageId),
                panel.organism,
                props.match.params.orgUnit,
                entity.id,
                entity.values
            )
            setEventData(data)
            if (!entity.id) {
                let newEntity = {...entity}
                newEntity.id = data.entityId
                setEntity(newEntity)
            }
            setLoading(false)
        }
        if (panel.valid && !event) getNewRecord()
    }, [panel.valid])

    useEffect(() => {
        const getExistingRecord = async () => {
            const { programId, programStage, eventValues, status, eventId, entityId }
                = await existingRecord(programs, event, props.isApproval)
            setEntity({ id: entityId })
            setPanel({
                programId,
                programStageId: programStage.id,
                organism: eventValues[_organismsDataElementId],
                valid: true,
            })
            setButtonDisabled(false)
            setEventData({ programStage, eventValues, status, eventId })
        }
        
        if (event) getExistingRecord()
    }, [])

    const disabled = buttonDisabled || !eventValid || !entity.valid || !panel.valid

    const onSubmit = async addMore => {
        setButtonDisabled(true)
        await setEventStatus(eventData.eventId, true, props.isApproval)

        if (addMore) {
            setPanel({
                programId: null,
                programStageId: null,
                organism: null,
                valid: false,
            })
            setEventData(null)
            setEventValid(false)
            setResetSwitch(!resetSwitch)
            setButtonDisabled(false)
        }
        else props.history.goBack()
    }

    const onEdit = async() => {
        setButtonDisabled(true)
        await setEventStatus(eventData.eventId)
        let newEventData = {...eventData}
        newEventData.status.completed = false
        setEventData(newEventData)
        setButtonDisabled(false)
    }

    const onDelete = async () => {
        setButtonDisabled(true)
        if (window.confirm('Are you sure you want to permanently delete this record?')) {
            await deleteEvent(eventData.eventId)
            props.history.goBack()
        }
        setButtonDisabled(false)
    }

    return (
        <Margin>
            <TitleRow
                title="Record"
                history={props.history}
            />
            <PersonForm
                metadata={{
                    person: person,
                    optionSets: optionSets
                }}
                passValues={setEntity}
                entityId={entity.id}
                showEdit={!event && !panel.valid}
            />
            {entity.valid && <RecordPanel
                programs={programList}
                programStages={stageLists}
                programOrganisms={programOrganisms}
                optionSets={optionSets}
                resetSwitch={resetSwitch}
                passValues={setPanel}
                disabled={panel.valid}
                values={panel}
            />}
            {eventData && <RecordForm
                passValues={setEventValid}
                programStage={eventData.programStage}
                rules={
                    programs.rules.filter(r =>
                        (r.program.id === panel.programId &&
                        (r.programStage ? r.programStage.id === panel.programStageId : true)) ||
                        (r.programStage ? r.programStage.id === panel.programStageId : false)
                    )
                }
                optionSets={optionSets}
                values={eventData.eventValues}
                eventId={eventData.eventId}
                status={eventData.status}
            />}
            {loading && <ProgressSection />}
            <ButtonRow
                buttons={
                    event
                    ? eventData ? [
                        {
                            label: 'Delete',
                            onClick: onDelete,
                            disabled: !eventData.status.deletable || buttonDisabled,
                            icon: 'delete',
                            kind: 'destructive',
                            tooltip: 'Permanently delete record',
                            disabledTooltip: 'You cannot delete records with an approval status',
                        },
                        {
                            label: eventData.status.completed ? 'Edit' : 'Submit',
                            onClick: () => eventData.status.completed ? onEdit() : onSubmit(false),
                            disabled: !eventData.status.editable || disabled,
                            icon: eventData.status.completed ? 'edit' : 'done',
                            kind: 'primary',
                            tooltip: eventData.status.completed ? 'Edit record' : 'Submit record',
                            disabledTooltip: eventData.status.completed ?
                                'Records with this approval status cannot be edited' :
                                'A required field is empty',
                        },
                    ] : []
                    : [
                        {
                            label: 'Submit and add new',
                            onClick: () => onSubmit(true),
                            disabled: disabled,
                            icon: 'add',
                            kind: 'primary',
                            tooltip: 'Submit record and add new record for the same person',
                            disabledTooltip: 'A required field is empty',
                        },
                        {
                            label: 'Submit',
                            onClick: () => onSubmit(false),
                            disabled: disabled,
                            icon: 'done',
                            kind: 'primary',
                            tooltip: 'Submit record',
                            disabledTooltip: 'A required field is empty',
                        },
                    ]
                }
            />
        </Margin>
    )
}

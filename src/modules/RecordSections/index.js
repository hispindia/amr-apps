import React, { useEffect } from 'react'
import {
    PersonForm,
    ProgressSection,
    RecordForm,
    RecordPanel,
    TitleRow
} from '../'
import {
    deleteEvent,
    setEventStatus,
    newRecord,
    existingRecord,
    ButtonRow,
    Margin
} from '../../'
import { hook } from './hook'

export const RecordSections = props => {
    const { optionSets, person, programs, programList, stageLists, programOrganisms } = props.metadata
    const event = props.match.params.event
    const orgUnit = props.match.params.orgUnit

    const [state, dispatch, types] = hook(programs.rules, person.values)

    const { entityId, entityValues, entityValid, programId, programStageId,
        organism, sampleDate, panelValid, eventId, eventValues, status, programStage,
        eventValid, resetSwitch, buttonDisabled, loading, rules } = state

    const disabled = buttonDisabled || !eventValid || !entityValid || !panelValid

    useEffect(() => {
        const getExistingRecord = async () => {
            dispatch({
                type: types.EXISTING_RECORD,
                ...(await existingRecord(programs, event, props.isApproval))
            })
        }
        if (event) getExistingRecord()
    }, [])

    useEffect(() => {
        const getNewRecord = async () => {
            dispatch({type: types.DISABLE_BUTTON, buttonDisabled: true})
            dispatch({
                type: types.NEW_RECORD,
                ...(await newRecord(
                    programId,
                    programs.find(p => p.id === programId).programStages
                        .find(s => s.id === programStageId),
                    organism,
                    orgUnit,
                    entityId,
                    entityValues,
                    sampleDate
            ))})
        }
        if (panelValid && !event) getNewRecord()
    }, [panelValid])

    const onSubmit = async addMore => {
        dispatch({type: types.DISABLE_BUTTON, buttonDisabled: true})
        await setEventStatus(eventId, true, props.isApproval)

        if (addMore) dispatch({type: types.ADD_MORE})
        else props.history.goBack()
    }

    const onEdit = async() => {
        dispatch({type: types.DISABLE_BUTTON, buttonDisabled: true})
        await setEventStatus(eventId)
        dispatch({type: types.EDIT})
    }

    const onDelete = async () => {
        dispatch({type: types.DISABLE_BUTTON, buttonDisabled: true})
        if (window.confirm('Are you sure you want to permanently delete this record?')) {
            await deleteEvent(eventId)
            props.history.goBack()
        }
        dispatch({type: types.DISABLE_BUTTON, buttonDisabled: false})
    }

    return (
        <Margin>
            <TitleRow
                title="Record"
                history={props.history}
            />
            <PersonForm
                id={entityId}
                values={entityValues}
                valid={entityValid}
                attributes={person.trackedEntityTypeAttributes}
                optionSets={optionSets}
                showEdit={!event && !panelValid}
                rules={person.rules}
                passValues={action => dispatch({type: types.SET_ENTITY, ...action})}
            />
            {entityValid && <RecordPanel
                programId={programId}
                programStageId={programStageId}
                organism={organism}
                sampleDate={sampleDate}
                programs={programList.filter(p => p.orgUnits.includes(orgUnit))}
                programStages={stageLists}
                programOrganisms={programOrganisms}
                optionSets={optionSets}
                resetSwitch={resetSwitch}
                passValues={action => dispatch({type: types.SET_PANEL, ...action})}
                disabled={panelValid}
            />}
            {eventId && <RecordForm
                programStage={programStage}
                rules={rules}
                optionSets={optionSets}
                values={eventValues}
                eventId={eventId}
                status={status}
                passValues={valid => dispatch({type: types.EVENT_VALID, valid: valid})}
            />}
            {loading && <ProgressSection/>}
            <ButtonRow
                buttons={
                    eventId ? [
                        {
                            label: 'Delete',
                            onClick: onDelete,
                            disabled: !status.deletable || buttonDisabled,
                            icon: 'delete',
                            kind: 'destructive',
                            tooltip: 'Permanently delete record',
                            disabledTooltip: 'You cannot delete records with an approval status',
                        },
                        {
                            label: status.completed ? 'Edit' : 'Submit',
                            onClick: () => status.completed ? onEdit() : onSubmit(false),
                            disabled: !status.editable || disabled,
                            icon: status.completed ? 'edit' : 'done',
                            kind: 'primary',
                            tooltip: status.completed ? 'Edit record' : 'Submit record',
                            disabledTooltip: status.completed ?
                                'Records with this approval status cannot be edited' :
                                'A required field is empty',
                        },
                    ]
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

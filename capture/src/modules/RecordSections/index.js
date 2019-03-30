import React, { useState, useEffect } from 'react'
import { Margin } from 'helpers'
import {
    PersonForm,
    RecordForm,
    RecordPanel,
    TitleRow,
    ProgressSection,
} from 'modules'
import {
    getProgramStageNew,
    getProgramStageExisting,
    deleteEvent,
    setEventStatus,
    newRecord,
    existingRecord,
    _organismsDataElementId
} from 'api'
import { ButtonRow } from 'inputs'

const getPanelMetadata = programs => {
    let programList = []
    let stageLists = {}
    let organismLists = {}

    programs.forEach(program => {
        programList.push({
            value: program.id,
            label: program.name,
        })
        let stages = []
        program.programStages.forEach(programStage =>
            stages.push({
                value: programStage.id,
                label: programStage.displayName,
            })
        )
        stageLists[program.id] = stages
        organismLists[program.id] = stages
    })

    return { programList, stageLists }
}

export const RecordSections = props => {
    const onSubmitClick = async addMore => {
        setButtonDisabled(true)
        await setEventStatus(eventData.eventId, true, eventData.status.editable)

        if (addMore) {
            setPanel(null)
            setEventData(null)
            setEventValid(false)
            setResetSwitch(!resetSwitch)
            setButtonDisabled(false)
        }
        else props.history.push('/')
    }

    const { optionSets, person, programs, programOrganisms } = props.metadata
    const event = props.match.params.event

    const [lists] = useState(getPanelMetadata(programs))
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
    const [buttonDisabled, setButtonDisabled] = useState(true)

    useEffect(() => {
        const getNewRecord = async () => {
            setLoading(true)
            setEventData(await newRecord(
                panel.programId,
                programs.find(p => p.id === panel.programId).programStages
                    .find(s => s.id === panel.programStageId),
                panel.organism,
                props.match.params.orgUnit,
                entity.id,
                entity.values
            ))
            setLoading(false)
        }
        if (panel.valid && !event) getNewRecord()
    }, [panel.valid])

    useEffect(() => {
        const getExistingRecord = async () => {
            const { programId, programStage, eventValues, status, eventId, entityId } = await existingRecord(programs, event)
            setEntity({ id: entityId })
            setPanel({
                programId,
                programStageId: programStage.id,
                organism: eventValues[_organismsDataElementId],
                valid: true,
            })
            setEventData({ programStage, eventValues, status, eventId })
        }
        
        if (event) getExistingRecord()
    }, [])

    const disabled = buttonDisabled || !eventValid || !entity.valid || !panel.valid

    return (
        <Margin>
            <TitleRow
                title="Record"
                backPath="/"
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
                programs={lists.programList}
                programStages={lists.stageLists}
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
                    [
                        {
                            label: 'Submit and add new',
                            onClick: () => onSubmitClick(true),
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
                            onClick: () => onSubmitClick(false),
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
        </Margin>
    )
}

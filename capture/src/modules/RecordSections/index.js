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
    newRecord
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
    const { optionSets, person, programs, programOrganisms } = props.metadata

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

    const [event, setEvent] = useState({
        valid: false,
        buttonDisabled: false
    })

    const [eventValid, setEventValid] = useState(false)

    const [eventData, setEventData] = useState(null)

    const { programList, stageLists } = getPanelMetadata(programs)

    const [resetSwitch, setResetSwitch] = useState(false)

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
        if (panel.valid) getNewRecord()
    }, [panel.valid])

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
                entityId={null}
                showEdit={true}
            />
            {entity.valid && <RecordPanel
                programs={programList}
                programStages={stageLists}
                programOrganisms={programOrganisms}
                optionSets={optionSets}
                resetSwitch={resetSwitch}
                passValues={setPanel}
                disabled={panel.valid}
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
        </Margin>
    )
}

/*
<RecordForm
                passValues={this.onEventValues}
                programStage={recordProps.programStage}
                rules={recordProps.rules}
                values={recordProps.eventValues}
                eventId={recordProps.eventId}
                completed={recordProps.completed}
            />*/
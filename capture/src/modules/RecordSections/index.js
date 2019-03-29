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
    setEventStatus
} from 'api'
import { ButtonRow } from 'inputs'

const getPanelMetadata = programs => {
    let programList = []
    let stageList = {}

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
        stageList[program.id] = stages
    })

    return { programList, stageList }
}

export const RecordSections = props => {
    const { optionSets, person, programs } = props.metadata

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

    const { programList, stageList } = getPanelMetadata(programs)
    console.log(programList)

    const [resetSwitch, setResetSwitch] = useState(false)

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
            <RecordPanel
                programs={programList}
                programStages={stageList}
                resetSwitch={resetSwitch}
                passValues={setPanel}
                disabled={false}
            />
            
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
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

export const RecordSections = props => {
    const { optionSets, person } = props.metadata

    const [entity, setEntity] = useState({
        values: person.values,
        id: null,
        valid: false,
    })

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
        </Margin>
    )
}
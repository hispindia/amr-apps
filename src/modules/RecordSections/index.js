import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { PersonForm, RecordForm, RecordPanel, TitleRow } from 'modules'
import { isDuplicateRecord } from 'api'
import {
    getExistingEvent,
    initNewEvent,
    createNewEvent,
    resetData,
} from '../../actions'
import { EventButtons } from './EventButtons'
import { EventModal } from './EventModal'

export const RecordSections = ({ history, match }) => {
    const [isFirstRender, setIsFirstRender] = useState(true)
    const dispatch = useDispatch()
    const constants = useSelector(state => state.metadata.constants)
    const entityValid = useSelector(state => state.data.entity.valid)
    const panelValid = useSelector(state => state.data.panel.valid)
    const eventId = useSelector(state => state.data.event.id)
    const deletePrompt = useSelector(state => state.data.deletePrompt)
    const orgUnit = match.params.orgUnit
    const event = match.params.event

    //const [state, dispatchlol] = hook(props.match.params.orgUnit)

    /*const {
        entityId,
        entityValid,
        organism,
        panelValid,
        eventId,
        status,
        eventInvalid,
        buttonDisabled,
        loading,
        deleteClicked,
        duplicate,
    } = state*/

    /*const disabled =
        buttonDisabled ||
        eventInvalid !== false ||
        !entityValid ||
        !panelValid ||
        duplicate === 'ERROR'*/

    useEffect(() => {
        dispatch(resetData())
        if (event) dispatch(getExistingEvent(orgUnit, event))
        else dispatch(initNewEvent(orgUnit))
        setIsFirstRender(false)
    }, [])

    useEffect(() => {
        if (!isFirstRender && panelValid && !event) dispatch(createNewEvent())
    }, [panelValid])

    /*const checkDuplicate = async sampleId => {
        if (!constants.days) return
        dispatchlol({
            type: types.SET_DUPLICATE,
            duplicate: await isDuplicateRecord(
                eventId,
                entityId,
                organism,
                sampleId
            ),
        })
    }*/

    if (isFirstRender) return <TitleRow title="Record" history={history} />

    return (
        <>
            {deletePrompt && <EventModal history={history} />}
            <TitleRow title="Record" history={history} />
            <PersonForm showEdit={!event && !panelValid} />
            {entityValid && <RecordPanel showEdit={!event} />}
            {eventId && <RecordForm />}
            <EventButtons history={history} eventParam={event} />
        </>
    )
}

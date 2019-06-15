import React, { useEffect, useState } from 'react'
import { withRouter } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { TitleRow } from 'components'
import { Entity, RecordForm, Panel } from 'modules'
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
    const panelValid = useSelector(state => state.data.panel.valid)
    const orgUnit = match.params.orgUnit
    const event = match.params.event

    useEffect(() => {
        dispatch(resetData())
        if (event) dispatch(getExistingEvent(orgUnit, event))
        else dispatch(initNewEvent(orgUnit))
        setIsFirstRender(false)
    }, [])

    useEffect(() => {
        if (!isFirstRender && panelValid && !event) dispatch(createNewEvent())
    }, [panelValid])

    if (isFirstRender) return <TitleRow title="Record" history={history} />

    return (
        <>
            <EventModal history={history} />
            <TitleRow title="Record" history={history} />
            <Entity showEdit={!event && !panelValid} />
            <Panel showEdit={!event} />
            <RecordForm />
            <EventButtons history={history} eventParam={event} />
        </>
    )
}

export default withRouter(RecordSections)

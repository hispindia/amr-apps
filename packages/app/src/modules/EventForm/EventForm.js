import React, { useEffect, useState } from 'react'
import { withRouter } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { TitleRow, Event, Panel } from 'components'
import {
    getExistingEvent,
    initNewEvent,
    createNewEvent,
    resetData,
    EventModal,
} from 'actions'
import { Entity } from './Entity'
import { EventButtons } from './EventButtons'
import { ERROR } from 'constants/statuses'

export const EventForm = ({ history, match }) => {
    const [isFirstRender, setIsFirstRender] = useState(true)
    const dispatch = useDispatch()
    const error = useSelector(state => state.data.status) === ERROR
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
        if (error) history.goBack()
    }, [error])

    useEffect(() => {
        if (!isFirstRender && panelValid && !event) dispatch(createNewEvent())
    }, [panelValid])

    if (isFirstRender) return <TitleRow title="Record" history={history} />

    return (
        <>
            <EventModal history={history} />
            <TitleRow title="Record" history={history} />
            <form autoComplete="off">
                <Entity showEdit={!event && !panelValid} />
                <Panel showEdit={!event && panelValid} />
                <Event />
            </form>
            <EventButtons history={history} existingEvent={event} />
        </>
    )
}

export default withRouter(EventForm)

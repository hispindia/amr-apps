import React, { useEffect, useState } from 'react'
import { withRouter } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import {
    DeleteModal,
    MainSection,
    TitleRow,
    Event,
    Panel,
    getExistingEvent,
    initNewEvent,
    createNewEvent,
    resetData,
    ERROR,
} from '@amr/app'
import { Entity } from './Entity'
import { EventButtons } from './EventButtons'

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

    const onDeleteSucccess = () => history.goBack()

    if (isFirstRender) return <TitleRow title="Record" history={history} />

    return (
        <MainSection padded>
            <DeleteModal type="record" onDeleteSucccess={onDeleteSucccess} />
            <TitleRow title="Record" history={history} />
            <form autoComplete="off">
                <Entity showEdit={!event && !panelValid} />
                <Panel showEdit={!event && panelValid} />
                <Event />
            </form>
            <EventButtons history={history} existingEvent={event} />
        </MainSection>
    )
}

export default withRouter(EventForm)

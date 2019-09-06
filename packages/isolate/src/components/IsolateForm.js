import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { TitleRow, Panel, Event, LoadingSection, ERROR } from '@amr/app'
import { getIsolate } from '../actions/data'
import { Buttons } from './Buttons'

export const IsolateForm = ({ history, match }) => {
    const dispatch = useDispatch()

    const programs = useSelector(state => state.metadata.programs)
    const loading = !useSelector(state => state.data.event.id)
    const error = useSelector(state => state.data.status) === ERROR
    const completed = useSelector(state => state.data.event.status.completed)

    const eventId = match.params.event

    useEffect(() => {
        dispatch(getIsolate(eventId))
    }, [programs, eventId, dispatch])

    return (
        <>
            <TitleRow title="Isolate" />
            <form autoComplete="off">
                {loading && !error && <LoadingSection />}
                <Panel />
                <Event />
                {!loading && !error && !completed && (
                    <Buttons history={history} />
                )}
            </form>
        </>
    )
}

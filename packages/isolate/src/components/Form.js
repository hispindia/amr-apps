import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
    EventModal,
    TitleRow,
    Panel,
    Event,
    LoadingSection,
    ERROR,
} from '@amr/app'
import { getIsolate } from '../actions'
import { Buttons } from './Buttons'
import { removeCorrespondingIsolate } from '../api'

export const Form = ({ history, match }) => {
    const dispatch = useDispatch()

    const programs = useSelector(state => state.metadata.programs)
    const loading = !useSelector(state => state.data.event.id)
    const error = useSelector(state => state.data.status) === ERROR
    const completed = useSelector(state => state.data.event.status.completed)

    const eventId = match.params.event

    useEffect(() => {
        dispatch(getIsolate(eventId))
    }, [programs, eventId, dispatch])

    const secondaryAction = async () =>
        await removeCorrespondingIsolate(eventId)

    return (
        <>
            <EventModal
                history={history}
                isIsolate
                secondaryAction={secondaryAction}
            />
            <TitleRow title="Isolate" />
            {loading && !error && <LoadingSection />}
            <form autoComplete="off">
                <Panel />
                <Event />
            </form>
            {!loading && !error && !completed && <Buttons history={history} />}
        </>
    )
}

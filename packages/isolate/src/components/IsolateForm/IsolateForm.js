import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { fetchIsolate } from '@amr/app'

export const IsolateForm = ({ match }) => {
    const programs = useSelector(state => state.metadata.programs)
    const eventId = match.params.event

    useEffect(() => {
        const test = async () => {
            await fetchIsolate(programs, eventId)
        }

        console.log('getIsolate')
        test()
    }, [programs, eventId])

    return <span>Event</span>
}

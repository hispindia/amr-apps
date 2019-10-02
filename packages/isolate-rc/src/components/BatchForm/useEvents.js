import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { showAlert } from '@hisp-amr/app'
import { getEvents } from '../../api'

export const useEvents = (program, from, to) => {
    const dispatch = useDispatch()

    const orgUnit = useSelector(state => state.selectedOrgUnit.id)

    const [events, setEvents] = useState(null)
    const [eventData, setEventData] = useState(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)
    const [retry, setRetry] = useState(false)

    useEffect(() => {
        const fetchEvents = async () => {
            setError(false)
            setLoading(true)
            setRetry(false)
            setEvents(null)
            try {
                const response = await getEvents({ program, orgUnit, from, to })
                const newEventData = response.listGrid.rows.map(r => ({
                    amrid: r[0],
                    enrollmentuid: r[1],
                    eventuid: r[2],
                    eventdate: r[3],
                    programuid: r[4],
                    teiuid: r[5],
                    orguid: r[6],
                }))

                setEventData(newEventData)
                setEvents(
                    newEventData.map(({ amrid, eventuid }) => ({
                        label: amrid,
                        value: eventuid,
                    }))
                )
            } catch (e) {
                console.error(e)
                setError(e)
                dispatch(
                    showAlert('Failed to get events', {
                        critical: true,
                        actions: [
                            {
                                label: 'Retry',
                                onClick: () => setRetry(true),
                            },
                        ],
                    })
                )
            } finally {
                setLoading(false)
            }
        }

        if (![program, from, to].includes('') && !!error === retry)
            fetchEvents()
    }, [program, from, to, retry])

    return { events, eventData, loading, error }
}

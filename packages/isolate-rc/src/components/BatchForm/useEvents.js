import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { showAlert } from '@hisp-amr/app'
import { getEvents } from '../../api'

export const useEvents = (program, from, to) => {
    const dispatch = useDispatch()

    const orgUnit = useSelector(state => state.selectedOrgUnit.id)

    const [events, setEvents] = useState(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)

    useEffect(() => {
        const fetchEvents = async () => {
            setLoading(true)
            setEvents(null)
            try {
                const response = await getEvents({ program, orgUnit, from, to })
                setEvents(
                    response.listGrid.rows.map(r => ({
                        label: r[0],
                        value: r[2],
                    }))
                )
            } catch (e) {
                console.error(e)
                setError(e)
                dispatch(
                    showAlert('Failed to get events', {
                        critical: true,
                    })
                )
            } finally {
                setLoading(false)
            }
        }

        if (![program, from, to].includes('')) fetchEvents()
    }, [program, from, to])

    return { events, loading, error }
}

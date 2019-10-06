import { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { showAlert } from '@hisp-amr/app'
import { getEvent, putEvent } from '@hisp-amr/api'
import { setValues } from './setValues'
import {
    ISOLATE_STATUS_ELEMENT,
    ISOLATE_CONDITION_ELEMENT,
    QUALITY_CHECK_ELEMENT,
    MOLECULAR_TEST_ELEMENT,
} from '../../constants/dataElements'

const dataElementIds = [
    ISOLATE_STATUS_ELEMENT,
    ISOLATE_CONDITION_ELEMENT,
    QUALITY_CHECK_ELEMENT,
    MOLECULAR_TEST_ELEMENT,
]

export const useBatch = (
    eventIds,
    { batchId, received, dispatched, dispatchStatus }
) => {
    const dispatch = useDispatch()

    const [data, setData] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)

    useEffect(() => {
        const getData = async () => {
            setLoading(true)

            try {
                const events = (await Promise.all(
                    eventIds.map(async e => await getEvent(e))
                )).map(e =>
                    setValues(e, {
                        batchId,
                        received,
                        dispatched,
                        dispatchStatus,
                    })
                )

                await Promise.all(
                    events
                        .filter(e => e.updateNeeded)
                        .map(async e => await putEvent(e))
                )

                setData(events)
                setError(false)
            } catch (e) {
                if (e === 404) {
                    setData([])
                    setError(false)
                } else {
                    console.error(e)
                    dispatch(
                        showAlert('Failed to get sample batches', {
                            critical: true,
                        })
                    )
                    setError(true)
                }
            } finally {
                setLoading(false)
            }
        }

        if (eventIds) getData()
    }, [eventIds])

    const mutate = async (eventId, dataElement, value) => {
        const newData = [...data]

        const event = newData.find(e => e.event === eventId)

        const dataValue = event.dataValues.find(
            dv => dv.dataElement === dataElement
        )

        if (!dataValue) event.dataValues.push({ dataElement, value })
        else dataValue.value = value

        if (
            dataElementIds.find(
                id =>
                    !event.dataValues.find(
                        ({ dataElement }) => dataElement === id
                    )
            )
        ) {
            setData(newData)
            return
        }

        putEvent(event)
        setData(newData)
    }

    return { data, loading, error, mutate }
}

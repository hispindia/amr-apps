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
import {
    ISOLATE_STATUS_ALIVE,
    ISOLATE_CONDITION_PURE,
} from '../../constants/options'

const dataElementIds = [
    ISOLATE_STATUS_ELEMENT,
    ISOLATE_CONDITION_ELEMENT,
    QUALITY_CHECK_ELEMENT,
    MOLECULAR_TEST_ELEMENT,
]

const findDataValue = (dataValues, id) =>
    dataValues.find(dv => dv.dataElement === id)

const removeDataValues = (dataValues, ids) =>
    dataValues.filter(dv => !ids.includes(dv.dataElement))

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

        const dataValue = findDataValue(event.dataValues, dataElement)

        if (!dataValue) event.dataValues.push({ dataElement, value })
        else dataValue.value = value

        if (
            dataElement === ISOLATE_STATUS_ELEMENT &&
            value !== ISOLATE_STATUS_ALIVE
        )
            event.dataValues = removeDataValues(
                event.dataValues,
                dataElementIds.slice(1)
            )
        else if (
            dataElement === ISOLATE_CONDITION_ELEMENT &&
            value !== ISOLATE_CONDITION_PURE
        )
            event.dataValues = removeDataValues(
                event.dataValues,
                dataElementIds.slice(2)
            )

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

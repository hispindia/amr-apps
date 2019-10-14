import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { showAlert } from '@hisp-amr/app'
import { getBatches, putBatches, getDataStoreKeys } from '../../api'
import { DISPATCH, RECEIVED } from '../../constants/statuses'

const toBatches = (batches, programs, orgUnits) => {
    const orgUnit = Object.keys(batches)[0]

    return batches[orgUnit]
        .filter(b => b.status === DISPATCH)
        .filter(b => programs.includes(b.program.id))
        .map(b => [
            b.BatchNo,
            orgUnits.find(o => o.code === orgUnit).displayName,
            b.rows.selectedArray.map(event => event.amrid).join(', '),
            b.program.displayName,
            b.disptachStatus.receivedDate,
            JSON.stringify(b.rows.selectedArray.map(event => event.eventuid)),
            b.dispatchDate,
            b.disptachStatus.received,
        ])
}

export const useBatches = refetch => {
    const dispatch = useDispatch()

    const selected = useSelector(state => state.selectedOrgUnit)
    const programs = useSelector(state => state.metadata.programs)
    const orgUnits = useSelector(state => state.metadata.organisationUnits)

    const [data, setData] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)

    useEffect(() => {
        const getData = async () => {
            setLoading(true)
            const userPrograms = programs
                .filter(p => p.access.data.write)
                .map(p => p.id)

            try {
                const keys = await getDataStoreKeys()

                const response = await Promise.all(
                    keys.map(async k => await getBatches(k))
                )

                setData(
                    response
                        .map(r => toBatches(r, userPrograms, orgUnits))
                        .flat()
                )
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

        if (selected) {
            if (selected.code) getData()
            else setData([])
        }
    }, [selected, refetch])

    const mutate = async (index, value) => {
        const orgUnitCode = data[index][1]

        try {
            const batches = (await getBatches(orgUnitCode))[orgUnitCode]

            batches.find(b => b.BatchNo === data[index][0]).disptachStatus = {
                received: RECEIVED,
                receivedDate: value,
            }

            await putBatches(orgUnitCode, {
                [orgUnitCode]: batches,
            })

            const newData = [...data]
            newData[index][4] = value
            setData(newData)
        } catch (e) {
            console.error(e)
            dispatch(
                showAlert('Failed to set received', {
                    critical: true,
                })
            )
        }
    }

    return { data, loading, error, mutate }
}

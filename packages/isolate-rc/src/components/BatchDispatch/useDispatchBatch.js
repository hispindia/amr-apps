import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { showAlert } from '@hisp-amr/app'
import { getBatches, putBatches } from '../../api'
import { DISPATCH } from '../../constants/statuses'

export const useDispatchBatch = ({
    execute,
    data,
    selectedEvents,
    dispatched,
}) => {
    const dispatch = useDispatch()

    const orgUnit = useSelector(state => state.selectedOrgUnit)

    const [success, setSuccess] = useState(false)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)

    useEffect(() => {
        const dispatchBatch = async () => {
            setLoading(true)
            try {
                const events = [
                    ...data.rows.availableArray,
                    ...data.rows.selectedArray,
                ]

                const newBatch = {
                    ...data,
                    status: DISPATCH,
                    dispatchDate: dispatched,
                    rows: {
                        availableArray: events.filter(
                            e => !selectedEvents.includes(e.eventuid)
                        ),
                        selectedArray: events.filter(e =>
                            selectedEvents.includes(e.eventuid)
                        ),
                    },
                }

                const batches = (await getBatches(orgUnit.code))[
                    orgUnit.code
                ].filter(b => b.BatchNo !== data.BatchNo)

                console.log(newBatch)
                console.log({
                    [orgUnit.code]: [...batches, newBatch],
                })

                /*const putResponse = await putBatches(orgUnit.code, {
                    [orgUnit.code]: [...batches, newBatch],
                })

                if (putResponse.httpStatusCode !== 200) throw putResponse*/

                dispatch(showAlert(`Batch ${data.BatchNo} dispatched`))
                setSuccess(true)
            } catch (e) {
                console.error(e)
                setError(e)
                dispatch(
                    showAlert('Failed dispatch', {
                        critical: true,
                    })
                )
            } finally {
                setLoading(false)
            }
        }

        if (execute) dispatchBatch()
    }, [execute, data, selectedEvents, dispatched])

    return { success, loading, error }
}

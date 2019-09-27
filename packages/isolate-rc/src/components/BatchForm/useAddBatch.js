import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import dayjs from 'dayjs'
import { showAlert } from '@hisp-amr/app'
import { getBatches, putBatches, postBatches } from '../../api'
import { generateAmrId } from '../../utils'
import { CREATE } from '../../constants/statuses'

export const useAddBatch = ({
    add,
    program,
    from,
    to,
    selectedEvents,
    eventData,
}) => {
    const dispatch = useDispatch()

    const orgUnit = useSelector(state => state.selectedOrgUnit)

    const programData = useSelector(state => state.metadata.programs)

    const [success, setSuccess] = useState(false)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)

    useEffect(() => {
        const newAmrId = generateAmrId(orgUnit.code)

        const addBatch = async () => {
            setLoading(true)
            try {
                const response = await getBatches(orgUnit.code)

                const batches =
                    response.httpStatusCode === 404
                        ? []
                        : response[orgUnit.code]

                const amrIds = batches.map(b => b.BatchNo)
                let amrId = newAmrId
                while (amrIds.includes(amrId)) amrId = newAmrId

                const newBatch = {
                    key: orgUnit.id,
                    BatchNo: amrId,
                    startDate: from,
                    endDate: to,
                    status: CREATE,
                    program: {
                        id: programData.find(p => p.id == program).id,
                        displayName: programData.find(p => p.id == program)
                            .displayName,
                    },
                    rows: {
                        availableArray: eventData.filter(
                            e => !selectedEvents.includes(e.eventuid)
                        ),
                        selectedArray: eventData.filter(e =>
                            selectedEvents.includes(e.eventuid)
                        ),
                    },
                    createdDate: dayjs().format('YYYY-MM-DD'),
                    dispatchDate: '',
                    disptachStatus: {
                        received: 'Not Received',
                        receivedDate: '',
                    },
                }

                const putResponse =
                    batches === []
                        ? await postBatches(orgUnit.code, {
                              [orgUnit.code]: [newBatch],
                          })
                        : await putBatches(orgUnit.code, {
                              [orgUnit.code]: [...batches, newBatch],
                          })

                if (putResponse.httpStatusCode !== 200) throw putResponse

                dispatch(showAlert(`Batch ${amrId} created`))
                setSuccess(true)
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

        if (add && ![program, from, to].includes('')) addBatch()
    }, [add, program, from, to])

    return { success, loading, error }
}

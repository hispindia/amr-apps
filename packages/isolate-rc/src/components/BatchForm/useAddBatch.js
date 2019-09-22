import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import dayjs from 'dayjs'
import { showAlert } from '@hisp-amr/app'
import { getBatches } from '../../api'
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
                const batches = (await getBatches(orgUnit.code))[orgUnit.code]

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
                console.log({ [orgUnit.code]: [...batches, newBatch] })
                setSuccess(true)
                dispatch(showAlert(`Batch ${amrId} created`))
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

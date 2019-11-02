import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { showAlert } from '@hisp-amr/app'
import { getBatches } from '../api'

export const useGetBatch = batchNo => {
    const dispatch = useDispatch()

    const orgUnit = useSelector(state => state.selectedOrgUnit)

    const [data, setData] = useState(false)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)
    const [retry, setRetry] = useState(false)

    useEffect(() => {
        const getBatch = async () => {
            setError(false)
            setLoading(true)
            setRetry(false)
            try {
                const response = await getBatches(orgUnit.code)

                const batch = response[orgUnit.code].find(
                    b => b.BatchNo === batchNo
                )

                setData(batch)
            } catch (e) {
                console.error(e)
                setError(e)
                dispatch(
                    showAlert('Failed to get batch', {
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

        if (!!error === retry) getBatch()
    }, [batchNo, retry])

    return { data, loading, error }
}

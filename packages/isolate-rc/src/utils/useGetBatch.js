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

    useEffect(() => {
        const getBatch = async () => {
            setLoading(true)
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
                    })
                )
            } finally {
                setLoading(false)
            }
        }

        getBatch()
    }, [batchNo])

    return { data, loading, error }
}

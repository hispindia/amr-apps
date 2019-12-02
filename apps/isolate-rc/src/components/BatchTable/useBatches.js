import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { showAlert } from '@hisp-amr/app'
import { getBatches } from '../../api'

export const useBatches = (filterBatches, refetch) => {
    const dispatch = useDispatch()

    const selected = useSelector(state => state.selectedOrgUnit)

    const [data, setData] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)

    useEffect(() => {
        const getData = async () => {
            setLoading(true)
            try {
                const response = await getBatches(selected.code)
                if (response.httpStatusCode === 404) throw 404
                setData(filterBatches(response[selected.code]))
                setError(false)
            } catch (e) {
                console.log('false loading')
                setLoading(false)
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
            else {
                setData([])
                setLoading(false)
            }
        }
    }, [selected, refetch])

    return { data, loading, error }
}

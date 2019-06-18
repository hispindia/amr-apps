import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getCounts } from 'api'
import { showAlert } from 'actions/alert'

export const useCounts = location => {
    const dispatch = useDispatch()
    const { categories, isApproval } = useSelector(state => state.appConfig)
    const user = useSelector(state => state.metadata.user)
    const selectedOrgUnit = useSelector(state => state.selectedOrgUnit.id)

    const [counts, setCounts] = useState(null)
    const [error, setError] = useState(false)

    useEffect(() => {
        const updateCounts = async () => {
            try {
                const data = await getCounts(categories, selectedOrgUnit, {
                    username: !isApproval ? user.username : false,
                    l2Member: user.l2Member,
                })
                setCounts(data)
                if (error) setError(false)
            } catch (e) {
                console.error(e)
                if (!error) setError(true)
                dispatch(
                    showAlert('Failed to get record counts.', {
                        critical: true,
                    })
                )
            }
        }
        updateCounts()
    }, [selectedOrgUnit, location])

    return [counts, error]
}

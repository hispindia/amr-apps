import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getCounts } from 'api'
import { showAlert } from '@hisp-amr/app'

export const useCounts = location => {
    const dispatch = useDispatch()
    const categories = useSelector(state => state.appConfig.categories)
    const user = useSelector(state => state.metadata.user)
    const selectedOrgUnit = useSelector(state => state.selectedOrgUnit.id)

    const [counts, setCounts] = useState(null)
    const [error, setError] = useState(false)

    useEffect(() => {
        const updateCounts = async () => {
            try {
                const data = await getCounts(
                    categories,
                    selectedOrgUnit,
                    user.username
                )
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
    }, [selectedOrgUnit, location, categories, dispatch, error, user.username])

    return [counts, error]
}

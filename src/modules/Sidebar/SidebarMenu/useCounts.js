import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { getCounts } from 'api'

export const useCounts = location => {
    const { categories, isApproval } = useSelector(state => state.appConfig)
    const user = useSelector(state => state.metadata.user)
    const selectedOrgUnit = useSelector(state => state.selectedOrgUnit.id)

    const [counts, setCounts] = useState(null)

    useEffect(() => {
        const updateCounts = async () =>
            setCounts(
                await getCounts(categories, selectedOrgUnit, {
                    username: !isApproval ? user.username : false,
                    l2Member: user.l2Member,
                })
            )

        updateCounts()
    }, [selectedOrgUnit, location])

    return counts
}

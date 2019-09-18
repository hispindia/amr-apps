import { useState, useEffect } from 'react'
import { getOrgUnits, getUserOrgUnits } from '../api'
import { toOrgUnitTree } from '../utils/toOrgUnitTree'

export const useOrgUnits = () => {
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [data, setData] = useState(null)

    useEffect(() => {
        const getData = async () => {
            try {
                const userOrgUnits = (await getUserOrgUnits()).organisationUnits.map(
                    ou => ou.id
                )

                const orgUnits = (await Promise.all(
                    userOrgUnits.map(ou => getOrgUnits(ou))
                )).map(ou => toOrgUnitTree(ou.organisationUnits))

                setData(orgUnits)
                setLoading(false)

            } catch (error) {
                console.error(error)
                setError(error)
            }
        }

        getData()
    }, [])

    return { data, loading, error }
}

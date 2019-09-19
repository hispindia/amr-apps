import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'

export const useGetPrograms = () => {
    const selected = useSelector(state => state.selectedOrgUnit)
    const programs = useSelector(state => state.metadata.programs)

    const [orgUnitPrograms, setOrgUnitPrograms] = useState([])

    useEffect(() => {
        if (programs && selected)
            setOrgUnitPrograms(
                programs
                    .filter(p =>
                        p.organisationUnits
                            .map(ou => ou.id)
                            .includes(selected.id)
                    )
                    .map(p => ({
                        label: p.displayName,
                        value: p.id,
                    }))
            )
    }, [programs, selected])

    return orgUnitPrograms
}

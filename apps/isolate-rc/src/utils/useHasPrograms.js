import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'

export const useHasPrograms = () => {
    const selected = useSelector(state => state.selectedOrgUnit)
    const programs = useSelector(state => state.metadata.programs)

    const [hasPrograms, setHasPrograms] = useState(false)

    useEffect(() => {
        if (programs && selected)
            setHasPrograms(
                !!programs.find(p =>
                    p.organisationUnits.map(ou => ou.id).includes(selected.id)
                )
            )
    }, [programs, selected])

    return hasPrograms
}

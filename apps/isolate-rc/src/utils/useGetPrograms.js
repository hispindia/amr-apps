import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { IGNORE } from '../constants/options'

export const useGetPrograms = () => {
    const selected = useSelector(state => state.selectedOrgUnit)
    const programs = useSelector(state => state.metadata.programs)

    const [orgUnitPrograms, setOrgUnitPrograms] = useState([])

    useEffect(() => {
        if (programs && selected)
            setOrgUnitPrograms(
                programs
                    .filter(
                        ({ displayName, organisationUnits }) =>
                            !displayName.includes(IGNORE) &&
                            organisationUnits
                                .map(ou => ou.id)
                                .includes(selected.id)
                    )
                    .map(({ displayName, id }) => ({
                        label: displayName,
                        value: id,
                    }))
            )
    }, [programs, selected])

    return orgUnitPrograms
}

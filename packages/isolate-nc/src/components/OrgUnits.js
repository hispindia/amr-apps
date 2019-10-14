import React from 'react'
import { useDispatch } from 'react-redux'
import { setOrgUnit } from '@hisp-amr/app'
import { OrgUnitTree } from '@hisp-amr/org-unit-tree'
import 'typeface-roboto'

export const OrgUnits = () => {
    const dispatch = useDispatch()

    const onSelect = orgUnit => dispatch(setOrgUnit(orgUnit))

    return <OrgUnitTree onSelect={onSelect} />
}

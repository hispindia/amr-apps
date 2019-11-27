import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { setOrgUnit } from '@hisp-amr/app'
import { OrgUnitTree } from '@hisp-amr/org-unit-tree'

export const OrgUnits = () => {
    const dispatch = useDispatch()
    const roots = useSelector(state => state.metadata.orgUnits)

    const onSelect = orgUnit => dispatch(setOrgUnit(orgUnit))

    return <OrgUnitTree onSelect={onSelect} roots={roots} />
}

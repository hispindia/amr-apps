import React from 'react'
import { useDispatch } from 'react-redux'
import styled from 'styled-components'
import { setOrgUnit } from '@hisp-amr/app'
import { OrgUnitTree } from '@hisp-amr/org-unit-tree'
import 'typeface-roboto'

const Section = styled.section`
    padding: 16px;
`

export const OrgUnits = () => {
    const dispatch = useDispatch()

    const onSelect = orgUnit => dispatch(setOrgUnit(orgUnit))

    return (
        <Section>
            <OrgUnitTree onSelect={onSelect} />
        </Section>
    )
}

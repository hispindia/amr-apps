import React from 'react'
import { useSelector } from 'react-redux'
import styled from 'styled-components'
import { Card } from '@dhis2/ui-core'
import { OrgUnitNode } from './OrgUnitNode'

export const StyledCard = styled(Card)`
    margin-top: 12px;
    padding: 8px;
`

export const StyledList = styled.ul`
    list-style-type: none;
    margin: 0;
    padding: 0;
`

/**
 * Organisation unit tree.
 */
export const OrgUnitTree = () => {
    const orgUnits = useSelector(state => state.metadata.orgUnits)
    return (
        <StyledCard>
            <StyledList>
                {orgUnits.map(orgUnit => (
                    <OrgUnitNode key={orgUnit.id} orgUnit={orgUnit} />
                ))}
            </StyledList>
        </StyledCard>
    )
}

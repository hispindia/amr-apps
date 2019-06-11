import React from 'react'
import { useSelector } from 'react-redux'
import { OrgUnitNode } from './OrgUnitNode'
import { StyledCard, StyledList } from './style'

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

import React from 'react'
import { useSelector } from 'react-redux'
import styled from 'styled-components'
import { OrgUnitNode } from './OrgUnitNode'

export const StyledList = styled.ul`
    list-style-type: none;
    margin: 0;
    padding: 16px;
`

/**
 * Organisation unit tree.
 */
export const OrgUnitTree = () => {
    const orgUnits = useSelector(state => state.metadata.orgUnits)
    return (
        <StyledList>
            {orgUnits.map(orgUnit => (
                <OrgUnitNode key={orgUnit.id} orgUnit={orgUnit} />
            ))}
        </StyledList>
    )
}

import React, { useEffect, useState } from 'react'
import { func } from 'prop-types'
import styled from 'styled-components'
import { useOrgUnits } from './useOrgUnits'
import { OrgUnitNode } from './OrgUnitNode'

export const StyledList = styled.ul`
    list-style-type: none;
    margin: 0;
    padding: 0;
`

/**
 * Organisation unit tree.
 */
export const OrgUnitTree = ({ onSelect, onError }) => {
    const { data, error, loading } = useOrgUnits()
    const [selected, setSelected] = useState(null)

    useEffect(() => {
        if (data)
            select({
                id: data[0].id,
                path: data[0].path,
                displayName: data[0].displayName,
                code: data[0].code,
            })
    }, [data])

    useEffect(() => {
        if (error) {
            console.error(error)
            onError()
        }
    }, [error])

    const select = orgUnit => {
        setSelected(orgUnit)
        onSelect(orgUnit)
    }

    if (!selected) return null

    return (
        <StyledList>
            {data.map(orgUnit => (
                <OrgUnitNode
                    key={orgUnit.id}
                    orgUnit={orgUnit}
                    selected={selected}
                    onSelect={select}
                />
            ))}
        </StyledList>
    )
}

OrgUnitTree.propTypes = {
    onSelect: func.isRequired,
    onError: func,
}

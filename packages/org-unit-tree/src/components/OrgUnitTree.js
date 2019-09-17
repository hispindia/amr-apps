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
        if (data) select(data[0].id, data[0].path, data[0].displayName)
    }, [data])

    useEffect(() => {
        if (error) {
            console.error(error)
            onError()
        }
    }, [error])

    const select = (id, path, displayName) => {
        setSelected({ id, path, displayName })
        onSelect({ id, displayName })
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

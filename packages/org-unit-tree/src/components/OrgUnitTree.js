import React, { useEffect, useState } from 'react'
import { array, func, shape, string, arrayOf } from 'prop-types'
import styled from 'styled-components'
import { useOrgUnits } from './useOrgUnits'
import { OrgUnitNode } from './OrgUnitNode'

export const StyledList = styled.ul`
    list-style-type: none;
    margin: 0;
    padding: 16px;
`

/**
 * Organisation unit tree.
 */
export const OrgUnitTree = ({ onSelect, onError, roots }) => {
    const { data, error } = useOrgUnits(roots)
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
    roots: arrayOf(
        shape({
            children: array.isRequired,
            displayName: string.isRequired,
            id: string.isRequired,
            path: string.isRequired,
            code: string.isRequired,
        })
    ),
}

import React, { useState, useEffect } from 'react'
import { func, object, shape, string } from 'prop-types'
import { Row } from 'styles'
import { Caret, ChildTree, OrgUnitText, NoCaret } from './style'

/**
 * Organisation unit node.
 */
export const OrgUnitNode = props => {
    const { selected, orgUnit, onSelect } = props
    const [opened, setOpened] = useState(false)

    useEffect(() => {
        setOpened(selected.path.includes(orgUnit.id))
    }, [])

    const onCarretClick = () => setOpened(!opened)

    return (
        <li key={orgUnit.id}>
            <Row>
                {orgUnit.children.length > 0 ? (
                    <Caret opened={opened} onClick={onCarretClick} />
                ) : (
                    <NoCaret />
                )}
                <OrgUnitText
                    isSelected={selected.id === orgUnit.id}
                    onClick={() => onSelect(orgUnit.id, orgUnit.path)}
                >
                    {orgUnit.displayName}
                </OrgUnitText>
            </Row>
            {orgUnit.children.length > 0 && opened ? (
                <ChildTree opened={opened}>
                    {orgUnit.children.map(child => (
                        <OrgUnitNode
                            orgUnit={child}
                            key={child.id}
                            onSelect={onSelect}
                            selected={selected}
                        />
                    ))}
                </ChildTree>
            ) : null}
        </li>
    )
}

OrgUnitNode.propTypes = {
    onSelect: func.isRequired,
    orgUnit: object.isRequired,
    selected: shape({
        id: string.isRequired,
        path: string.isRequired,
    }).isRequired,
}

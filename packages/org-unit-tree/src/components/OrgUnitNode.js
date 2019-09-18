import React, { useState, useEffect } from 'react'
import { func, object } from 'prop-types'
import { Caret } from './Caret'
import { ChildTree } from './ChildTree'
import { Label } from './Label'
import { NoCaret } from './NoCaret'
import { Row } from './Row'

/**
 * Organisation unit node.
 */
export const OrgUnitNode = ({ orgUnit, selected, onSelect }) => {
    const [opened, setOpened] = useState(false)

    useEffect(() => {
        setOpened(selected.path.includes(orgUnit.id))
    }, [selected.path, orgUnit.id])

    const onCarretClick = () => setOpened(!opened)

    const onOrgUnitClick = () => {
        if (selected.id !== orgUnit.id)
            onSelect({
                id: orgUnit.id,
                path: orgUnit.path,
                displayName: orgUnit.displayName,
                code: orgUnit.code,
            })
    }

    return (
        <li key={orgUnit.id}>
            <Row>
                {orgUnit.children.length > 0 ? (
                    <Caret opened={opened} onClick={onCarretClick} />
                ) : (
                    <NoCaret />
                )}
                <Label
                    isSelected={selected.id === orgUnit.id}
                    onClick={onOrgUnitClick}
                >
                    {orgUnit.displayName}
                </Label>
            </Row>
            {orgUnit.children.length > 0 && opened ? (
                <ChildTree opened={opened}>
                    {orgUnit.children.map(child => (
                        <OrgUnitNode
                            key={child.id}
                            orgUnit={child}
                            selected={selected}
                            onSelect={onSelect}
                        />
                    ))}
                </ChildTree>
            ) : null}
        </li>
    )
}

OrgUnitNode.propTypes = {
    orgUnit: object.isRequired,
    selected: object.isRequired,
    onSelect: func.isRequired,
}

import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { object } from 'prop-types'
import { Row } from '@amr/app'
import { setOrgUnit } from 'actions'
import { Caret, ChildTree, OrgUnitText, NoCaret } from './style'

/**
 * Organisation unit node.
 */
export const OrgUnitNode = ({ orgUnit }) => {
    const dispatch = useDispatch()
    const selected = useSelector(state => state.selectedOrgUnit)
    const [opened, setOpened] = useState(false)

    useEffect(() => {
        setOpened(selected.path.includes(orgUnit.id))
    }, [selected.path, orgUnit.id])

    const onCarretClick = () => setOpened(!opened)

    const onOrgUnitClick = () => dispatch(setOrgUnit(orgUnit.id, orgUnit.path))

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
                    onClick={onOrgUnitClick}
                >
                    {orgUnit.displayName}
                </OrgUnitText>
            </Row>
            {orgUnit.children.length > 0 && opened ? (
                <ChildTree opened={opened}>
                    {orgUnit.children.map(child => (
                        <OrgUnitNode orgUnit={child} key={child.id} />
                    ))}
                </ChildTree>
            ) : null}
        </li>
    )
}

OrgUnitNode.propTypes = { orgUnit: object.isRequired }

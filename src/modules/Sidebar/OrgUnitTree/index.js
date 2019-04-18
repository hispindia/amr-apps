import React, { useContext } from 'react'
import { func, shape, string } from 'prop-types'
import { Card } from '@dhis2/ui/core'
import { Margin } from 'styles'
import { MetadataContext } from 'contexts'
import { OrgUnitNode } from './OrgUnitNode'
import { OrgUnitTreeStyle } from './style'

/**
 * Organisation unit tree.
 */
export const OrgUnitTree = ({ onSelect, selected }) => {
    const { orgUnits } = useContext(MetadataContext)
    return (
        <Card>
            <Margin margin={8}>
                <OrgUnitTreeStyle>
                    {orgUnits.map(orgUnit => (
                        <OrgUnitNode
                            orgUnit={orgUnit}
                            key={orgUnit.id}
                            show={true}
                            onSelect={onSelect}
                            selected={selected}
                        />
                    ))}
                </OrgUnitTreeStyle>
            </Margin>
        </Card>
    )
}

OrgUnitTree.propTypes = {
    onSelect: func.isRequired,
    selected: shape({
        id: string.isRequired,
        path: string.isRequired,
    }).isRequired,
}

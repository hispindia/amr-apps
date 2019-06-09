import React from 'react'
import { useSelector } from 'react-redux'
import { Card } from '@dhis2/ui-core'
import { Margin } from 'styles'
import { OrgUnitNode } from './OrgUnitNode'
import { OrgUnitTreeStyle } from './style'

/**
 * Organisation unit tree.
 */
export const OrgUnitTree = () => {
    const orgUnits = useSelector(state => state.metadata.orgUnits)
    return (
        <Card>
            <Margin margin={8}>
                <OrgUnitTreeStyle>
                    {orgUnits.map(orgUnit => (
                        <OrgUnitNode key={orgUnit.id} orgUnit={orgUnit} />
                    ))}
                </OrgUnitTreeStyle>
            </Margin>
        </Card>
    )
}

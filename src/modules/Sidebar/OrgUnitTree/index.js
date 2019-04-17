import React from 'react'
import { arrayOf, func, object, shape, string } from 'prop-types'
import { Card } from '@dhis2/ui/core'
import { Margin } from 'styles'
import { OrgUnitNode } from './OrgUnitNode'
import { OrgUnitTreeStyle } from './style'

/**
 * Organisation unit tree.
 */
export const OrgUnitTree = props => (
    <Card>
        <Margin margin={8}>
            <OrgUnitTreeStyle>
                {props.orgUnits.map(orgUnit => (
                    <OrgUnitNode
                        orgUnit={orgUnit}
                        key={orgUnit.id}
                        show={true}
                        onSelect={props.onSelect}
                        selected={props.selected}
                    />
                ))}
            </OrgUnitTreeStyle>
        </Margin>
    </Card>
)

OrgUnitTree.propTypes = {
    onSelect: func.isRequired,
    orgUnits: arrayOf(object).isRequired,
    selected: shape({
        id: string.isRequired,
        path: string.isRequired,
    }).isRequired,
}

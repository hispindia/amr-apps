import React from 'react'
import PropTypes from 'prop-types'
import { Card } from '@dhis2/ui/core'
import styled from 'styled-components'
import { Margin } from 'styles'
import { OrgUnitNode } from './OrgUnitNode'

const OrgUnitTreeStyle = styled.ul`
    list-style-type: none;
    margin: 0;
    padding: 0;
`

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
    selected: PropTypes.string.isRequired,
    onSelect: PropTypes.func.isRequired,
    orgUnits: PropTypes.arrayOf(PropTypes.object).isRequired,
}

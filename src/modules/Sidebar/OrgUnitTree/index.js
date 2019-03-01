import React from 'react'
import { OrgUnitNode } from './OrgUnitNode'
import { Card } from '@dhis2/ui/core'
import styled from 'styled-components'
import { MarginTopSmall, MarginSmall } from '../../../helpers/helpers'

const OrgUnitTreeStyle = styled.ul`
    list-style-type: none;
    margin: 0;
    padding: 0;
`

/**
 * Organisation unit tree.
 */
export class OrgUnitTree extends React.Component {
    render() {
        return (
            <MarginTopSmall>
                <Card>
                    <MarginSmall>
                        <OrgUnitTreeStyle>
                            {this.props.orgUnits.map(orgUnit => (
                                <OrgUnitNode
                                    orgUnit={orgUnit}
                                    key={orgUnit.id}
                                    show={true}
                                    onSelect={this.props.onSelect}
                                    selected={this.props.selected}
                                />
                            ))}
                        </OrgUnitTreeStyle>
                    </MarginSmall>
                </Card>
            </MarginTopSmall>
        )
    }
}

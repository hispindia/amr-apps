import React, { Component } from 'react'
import { Button } from '@dhis2/ui/core'
import { RowR, MarginTop } from '../../helpers/helpers'
import styled from 'styled-components'

const PaddingLeft = styled.div`
    padding-left: 12px;
`

/**
 * Entity information buttons (Submit/Edit/Delete).
 */
export class EntityButtons extends Component {
    render() {
        return (
            <MarginTop>
                <RowR>
                    {this.props.buttons.map(button => (
                        <PaddingLeft key={button.label}>
                            <Button
                                variant="contained"
                                kind={button.kind}
                                onClick={button.onClick}
                                disabled={button.disabled}
                                icon={button.icon}
                            >
                                {button.label}
                            </Button>
                        </PaddingLeft>
                    ))}
                </RowR>
            </MarginTop>
        )
    }
}

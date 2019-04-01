import React from 'react'
import { Button } from '@dhis2/ui/core'
import styled from 'styled-components'
import { MarginTop } from '../../helpers/helpers'

const SpaceBetween = styled.div`
    justify-content: space-between;
    display: flex;
`

/**
 * Row of buttons.
 */
export const ButtonRow = props => (
    <MarginTop>
        <SpaceBetween>
            {props.buttons.map(button => (
                <div
                    key={button.label}
                    title={
                        button.disabled
                            ? button.disabledTooltip
                            : button.tooltip
                    }
                >
                    <Button
                        kind={button.kind}
                        onClick={button.onClick}
                        disabled={button.disabled}
                        icon={button.icon}
                    >
                        {button.label}
                    </Button>
                </div>
            ))}
        </SpaceBetween>
    </MarginTop>
)

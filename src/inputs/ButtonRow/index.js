import React from 'react'
import { Button } from '@dhis2/ui/core'
import styled, { css } from 'styled-components'
import { MarginTop } from 'helpers'

const SpaceBetween = styled.div`
    justify-content: space-between;
    display: flex;
    ${props =>
        props.unspaced &&
        css`
            justify-content: unset;
        `}
`

const ButtonPadding = styled.div`
    ${props =>
        props.unspaced &&
        css`
            padding-right: 16px;
        `}
`

/**
 * Row of buttons.
 */
export const ButtonRow = props => (
    <MarginTop>
        <SpaceBetween unspaced={props.unspaced}>
            {props.buttons.map(button => (
                <ButtonPadding
                    unspaced={props.unspaced}
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
                </ButtonPadding>
            ))}
        </SpaceBetween>
    </MarginTop>
)

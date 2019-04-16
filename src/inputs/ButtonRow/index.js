import React from 'react'
import PropTypes from 'prop-types'
import { Button } from '@dhis2/ui/core'
import styled, { css } from 'styled-components'
import { MarginTop } from 'styles'

const SpaceBetween = styled.div`
    justify-content: space-between;
    display: flex;
    ${props =>
        props.unspaced &&
        css`
            justify-content: flex-end;
        `}
`

const ButtonPadding = styled.div`
    ${props =>
        props.unspaced &&
        css`
            padding-left: 8px;
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

ButtonRow.propTypes = {
    unspaced: PropTypes.bool,
    buttons: PropTypes.arrayOf(
        PropTypes.shape({
            label: PropTypes.string.isRequired,
            onClick: PropTypes.func.isRequired,
            icon: PropTypes.string.isRequired,
            tooltip: PropTypes.string,
            disabledTooltip: PropTypes.string,
            disabled: PropTypes.bool,
            kind: PropTypes.oneOf([
                'basic',
                'primary',
                'secondary',
                'destructive',
            ]).isRequired,
        })
    ).isRequired,
}

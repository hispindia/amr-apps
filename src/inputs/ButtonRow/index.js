import React from 'react'
import { arrayOf, bool, func, oneOf, shape, string } from 'prop-types'
import { Button } from '@dhis2/ui/core'
import { MarginTop } from 'styles'
import { ButtonPadding, SpaceBetween } from './style'

/**
 * Row of buttons.
 */
export const ButtonRow = props => (
    <MarginTop className={props.className}>
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
                        size={button.size ? button.size : 'medium'}
                    >
                        {button.label}
                    </Button>
                </ButtonPadding>
            ))}
        </SpaceBetween>
    </MarginTop>
)

ButtonRow.propTypes = {
    unspaced: bool,
    buttons: arrayOf(
        shape({
            label: string.isRequired,
            onClick: func.isRequired,
            icon: string.isRequired,
            tooltip: string,
            disabledTooltip: string,
            disabled: bool,
            kind: oneOf(['basic', 'primary', 'secondary', 'destructive'])
                .isRequired,
            size: oneOf(['small', 'medium', 'large']),
        })
    ).isRequired,
}

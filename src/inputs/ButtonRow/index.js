import React from 'react'
import { arrayOf, bool, func, shape, string } from 'prop-types'
import { Button } from '@dhis2/ui-core'
import { MarginTop } from 'styles'
import { ButtonPadding, SpaceBetween } from './style'
import { Icon } from 'components'

/**
 * Row of buttons.
 */
export const ButtonRow = ({ className, unspaced, buttons }) => (
    <MarginTop className={className}>
        <SpaceBetween unspaced={unspaced}>
            {buttons.map(button => (
                <ButtonPadding
                    unspaced={unspaced}
                    key={button.label}
                    title={
                        button.disabled
                            ? button.disabledTooltip
                            : button.tooltip
                    }
                >
                    <Button
                        primary={button.primary}
                        secondary={button.secondary}
                        destructive={button.destructive}
                        onClick={button.onClick}
                        disabled={button.disabled}
                        icon={button.icon && <Icon icon={button.icon} />}
                        small={button.small}
                        large={button.large}
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
            small: bool,
            large: bool,
            primary: bool,
            secondary: bool,
            destructive: bool,
        })
    ).isRequired,
}

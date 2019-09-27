import React from 'react'
import { arrayOf, bool, func, shape, string } from 'prop-types'
import { Button } from '@dhis2/ui-core'
import { Icon, icons } from '@hisp-amr/icons'
import { ButtonPadding, ButtonContainer } from './style'
import { LoadingIcon } from 'components/LoadingIcon'

/**
 * Row of buttons.
 */
export const ButtonRow = ({ buttons, initialFocus, className }) => (
    <ButtonContainer className={className}>
        {buttons.map(button => (
            <ButtonPadding key={button.label} title={button.tooltip}>
                <Button
                    primary={button.primary}
                    secondary={button.secondary}
                    destructive={button.destructive}
                    onClick={button.onClick}
                    disabled={button.disabled || button.loading}
                    icon={
                        button.loading ? (
                            <LoadingIcon />
                        ) : (
                            button.icon && <Icon icon={icons[button.icon]} />
                        )
                    }
                    small={button.small}
                    large={button.large}
                    initialFocus={
                        initialFocus && (button.primary || button.destructive)
                    }
                >
                    {button.label}
                </Button>
            </ButtonPadding>
        ))}
    </ButtonContainer>
)

ButtonRow.propTypes = {
    buttons: arrayOf(
        shape({
            label: string.isRequired,
            onClick: func.isRequired,
            icon: string.isRequired,
            tooltip: string,
            disabled: bool,
            loading: bool,
            small: bool,
            large: bool,
            primary: bool,
            secondary: bool,
            destructive: bool,
        })
    ).isRequired,
    className: string,
    initialFocus: bool,
}

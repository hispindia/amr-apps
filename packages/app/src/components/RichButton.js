import React from 'react'
import { bool, func, string } from 'prop-types'
import { Button } from '@dhis2/ui-core'
import { Icon } from 'components'
import { LoadingIcon } from 'components/LoadingIcon'

/**
 * Button with supporting tooltip and loading spinner.
 */
export const RichButton = ({
    tooltip,
    primary,
    secondary,
    destructive,
    onClick,
    disabled,
    loading,
    icon,
    small,
    large,
    initialFocus,
    label,
}) => {
    return (
        <Button
            primary={primary}
            secondary={secondary}
            destructive={destructive}
            onClick={onClick}
            disabled={disabled || loading}
            icon={loading ? <LoadingIcon /> : icon && <Icon icon={icon} />}
            small={small}
            large={large}
            initialFocus={initialFocus}
            title="hello"
        >
            {label}
        </Button>
    )
}

RichButton.propTypes = {
    tooltip: string,
    primary: bool,
    secondary: bool,
    destructive: bool,
    onClick: func.isRequired,
    disabled: bool,
    loading: bool,
    icon: string,
    small: bool,
    large: bool,
    initialFocus: bool,
    label: string.isRequired,
}

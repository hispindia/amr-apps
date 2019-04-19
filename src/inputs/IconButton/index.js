import React from 'react'
import { func, string } from 'prop-types'
import { Icon } from '@dhis2/ui/core'
import { IconContainer } from './style'

/**
 * Icon Button.
 */
export const IconButton = ({ tooltip, onClick, icon }) => (
    <IconContainer title={tooltip} onClick={onClick}>
        <Icon name={icon} className={icon} />
    </IconContainer>
)

IconButton.propTypes = {
    tooltip: string.isRequired,
    onClick: func.isRequired,
    icon: string.isRequired,
}

import React from 'react'
import { func, string } from 'prop-types'
import { Icon } from 'components'
import { IconContainer } from './style'

/**
 * Icon Button.
 */
export const IconButton = ({ tooltip, onClick, icon }) => (
    <IconContainer title={tooltip} onClick={onClick}>
        <Icon icon={icon} large />
    </IconContainer>
)

IconButton.propTypes = {
    tooltip: string.isRequired,
    onClick: func.isRequired,
    icon: string.isRequired,
}

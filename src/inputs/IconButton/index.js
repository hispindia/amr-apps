import React from 'react'
import { func, string } from 'prop-types'
import { Icon } from '@dhis2/ui/core'
import { IconContainer } from './style'

/**
 * Icon Button.
 */
export const IconButton = props => (
    <IconContainer onClick={props.onClick}>
        <Icon name={props.name} className={props.icon} />
    </IconContainer>
)

IconButton.propTypes = {
    onClick: func.isRequired,
    name: string.isRequired,
    icon: string.isRequired,
}

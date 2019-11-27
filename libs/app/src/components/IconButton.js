import React from 'react'
import { func, string } from 'prop-types'
import styled from 'styled-components'
import { theme } from '@dhis2/ui-core'
import { Icon, icons } from '@hisp-amr/icons'

export const IconContainer = styled.div`
    display: flex;
    align-items: center;
    margin-top: auto;
    margin-bottom: auto;
    height: 64px;
    width: 64px;
    border-radius: 50%;
    cursor: pointer;
    &:hover {
        fill: ${theme.secondary600};
        background-color: rgba(0, 0, 0, 0.08);
    }
`

/**
 * Icon Button.
 */
export const IconButton = ({ tooltip, onClick, icon }) => (
    <IconContainer title={tooltip} onClick={onClick}>
        <Icon icon={icons[icon]} size={40} />
    </IconContainer>
)

IconButton.propTypes = {
    tooltip: string.isRequired,
    onClick: func.isRequired,
    icon: string.isRequired,
}

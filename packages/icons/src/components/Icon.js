import React from 'react'
import { number } from 'prop-types'
import { StyledSvg } from './StyledSvg'
import { colorsPropType, iconsPropType } from '../propTypes'

export const Icon = ({ icon, color, size }) => (
    <StyledSvg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        color={color}
        size={size}
    >
        <path d={icon} />
    </StyledSvg>
)

Icon.propTypes = {
    icon: iconsPropType.isRequired,
    size: number,
    color: colorsPropType,
}

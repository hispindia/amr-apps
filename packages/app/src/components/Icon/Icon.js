import React from 'react'
import { bool, oneOf, string } from 'prop-types'
import { icons } from './icons'
import { StyledSvg } from './style'

export const Icon = ({ icon, color, large }) => (
    <StyledSvg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        color={color}
        large={large}
    >
        <path d={icons[icon]} />
    </StyledSvg>
)

Icon.propTypes = {
    icon: string,
    large: bool,
    color: oneOf([
        'primary',
        'secondary',
        'blue',
        'teal',
        'red',
        'yellow',
        'green',
        'white',
        'black',
    ]),
}

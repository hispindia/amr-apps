import styled, { css } from 'styled-components'
import { bool, oneOf } from 'prop-types'
import { colors, theme } from '@dhis2/ui-core'

const themeColors = {
    primary: theme.primary600,
    secondary: theme.secondary600,
    blue: colors.blue600,
    teal: colors.teal600,
    red: colors.red600,
    yellow: colors.yellow600,
    green: colors.green600,
    white: colors.white,
    black: colors.grey900,
}

export const StyledSvg = styled.svg`
    width: 24px;
    height: 24px;
    ${({ large, color }) => {
        if (large)
            return css`
                margin: auto;
                width: 40px;
                height: 40px;
            `
        if (color)
            return css`
                fill: ${themeColors[color]};
            `
    }}
`

StyledSvg.propTypes = {
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

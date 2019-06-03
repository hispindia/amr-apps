import styled, { css } from 'styled-components'
import { bool, oneOf } from 'prop-types'
import { colors, theme } from '@dhis2/ui-core'

const colors = {
    primary: theme.primary600,
    secondary: theme.secondary600,
    blue: colors.blue600,
    teal: colors.teal600,
    red: colors.red600,
    yellow: colors.yellow600,
    green: colors.green600,
    white: colors.white,
}

export const StyledSvg = styled.svg`
    width: 24px;
    height: 24px;
    margin: auto;
    ${({ large, color }) => {
        if (large)
            return css`
                width: 48px;
                height: 48px;
            `
        if (color)
            return css`
                fill: ${colors[color]};
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
    ]),
}

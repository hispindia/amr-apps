import styled, { css } from 'styled-components'
import { number } from 'prop-types'
import { colorsPropType } from '../propTypes'

export const StyledSvg = styled.svg`
    margin: auto;
    width: 24px;
    height: 24px;
    ${({ size, color }) => {
        if (size)
            return css`
                margin: auto;
                width: ${size}px;
                height: ${size}px;
            `
        if (color)
            return css`
                fill: ${themeColors[color]};
            `
    }}
`

StyledSvg.propTypes = {
    size: number,
    color: colorsPropType,
}

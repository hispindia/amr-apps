import styled, { css } from 'styled-components'
import { number } from 'prop-types'
import { colorsPropType } from '../propTypes'
import { colors } from '../colors'

export const StyledSvg = styled.svg`
    width: 24px;
    height: 24px;
    flex-shrink: 0;
    ${({ size, color }) => {
        if (size)
            return css`
                margin: auto;
                width: ${size}px;
                height: ${size}px;
            `
        if (color)
            return css`
                fill: ${colors[color]};
            `
    }}
`

StyledSvg.propTypes = {
    size: number,
    color: colorsPropType,
}

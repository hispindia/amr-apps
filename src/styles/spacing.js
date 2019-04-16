import { oneOf } from 'prop-types'
import styled, { css } from 'styled-components'

const scales = [4, 8, 12, 16, 24, 32, 48, 64, 96, 128, 192, 256, 384, 512, 640]

export const Margin = styled.div`
    ${props =>
        css`
            margin: ${props.margin}px;
        `}
`
Margin.defaultProps = { margin: 16 }
Margin.propTypes = { margin: oneOf(scales) }

export const MarginTop = styled.div`
    ${props =>
        css`
            margin-top: ${props.margin}px;
        `}
`
MarginTop.defaultProps = { margin: 16 }
MarginTop.propTypes = { margin: oneOf(scales) }

export const MarginBottom = styled.div`
    ${props =>
        css`
            margin-bottom: ${props.margin}px;
        `}
`
MarginBottom.defaultProps = { margin: 16 }
MarginBottom.propTypes = { margin: oneOf(scales) }

export const Padding = styled.div`
    ${props =>
        css`
            padding: ${props.padding}px;
        `}
`
Padding.defaultProps = { padding: 16 }
Padding.propTypes = { padding: oneOf(scales) }

export const OptionSpacer = styled.div`
    margin-right: 40px;
`

import { bool } from 'prop-types'
import styled, { css } from 'styled-components'

export const Row = styled.div`
    display: flex;
    flex-direction: row;
    ${({ wrapped, reversed }) => {
        if (wrapped)
            return css`
                flex-wrap: wrap;
            `
        if (reversed)
            return css`
                flex-direction: row-reverse;
            `
    }}
`
Row.propTypes = {
    wrapped: bool,
    reversed: bool,
}

export const Col = styled.div`
    display: flex;
    flex-direction: column;
    ${({ wrapped, reversed }) => {
        if (wrapped)
            return css`
                flex-wrap: wrap;
            `
        if (reversed)
            return css`
                flex-direction: column-reverse;
            `
    }}
`
Col.propTypes = {
    wrapped: bool,
    reversed: bool,
}

export const Input = styled.div`
    min-width: 268px;
`

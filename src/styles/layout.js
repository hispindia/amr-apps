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
    min-width: 300px;
    .ui_selectfield_label_1a3v8.ui_selectfield_required_1a3v8::after,
    .ui_inputfield_label_kvrmz.ui_inputfield_required_kvrmz::after {
        color: var(--red600);
        padding-left: 4px;
    }
`

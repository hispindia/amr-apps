import styled, { css } from 'styled-components'

export const SpaceBetween = styled.div`
    justify-content: space-between;
    display: flex;
    ${props =>
        props.unspaced &&
        css`
            justify-content: flex-end;
        `}
`

export const ButtonPadding = styled.div`
    ${props =>
        props.unspaced &&
        css`
            padding-left: 8px;
        `}
`

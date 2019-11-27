import styled, { css } from 'styled-components'

export const Caret = styled.span`
    cursor: pointer;
    user-select: none;
    line-height: 22px;
    &::before {
        content: '\\2023';
        color: black;
        display: inline-block;
        margin-right: 5px;
    }
    ${props =>
        props.opened &&
        css`
            &:before {
                transform: rotate(90deg);
            }
        `}
`

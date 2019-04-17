import styled, { css } from 'styled-components'

export const Caret = styled.span`
    cursor: pointer;
    user-select: none;
    &::before {
        content: '\\2023';
        color: black;
        display: inline-block;
        margin-right: 5px;
    }
    :hover::before {
        color: var(--primary800);
    }
    ${props =>
        props.opened &&
        css`
            &:before {
                transform: rotate(90deg);
            }
        `}
`

export const NoCaret = styled.span`
    user-select: none;
    &::before {
        content: '\\2007';
        display: inline-block;
        margin-right: 5px;
    }
`

export const OrgUnitText = styled.span`
    cursor: pointer;
    user-select: none;
    &:hover {
        color: var(--primary800);
    }
    ${props =>
        props.isSelected &&
        css`
            color: var(--primary800);
        `}
`

export const ChildTree = styled.ul`
    list-style-type: none;
    padding-left: 20px;
    ${props =>
        !props.opened &&
        css`
            display: none;
        `}
`

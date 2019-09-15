import styled, { css } from 'styled-components'
import { theme } from '@dhis2/ui-core'

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
    line-height: 22px;
    white-space: nowrap;
    &:hover {
        color: ${theme.secondary600};
    }
    ${props =>
        props.isSelected &&
        css`
            color: ${theme.secondary600};
            cursor: unset;
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

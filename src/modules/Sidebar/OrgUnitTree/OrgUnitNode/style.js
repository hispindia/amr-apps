import styled, { css } from 'styled-components'
import { theme } from '@dhis2/ui-core'

export const Caret = styled.span`
    cursor: pointer;
    user-select: none;
    line-height: 26px;
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
    border-radius: 3px;
    line-height: 26px;
    padding: 0px 5px;
    white-space: nowrap;
    &:hover {
        background: ${theme.secondary600};
        color: white;
    }
    ${props =>
        props.isSelected &&
        css`
            background: ${theme.secondary600};
            color: white;
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

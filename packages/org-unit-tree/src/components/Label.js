import styled, { css } from 'styled-components'
import { theme } from '@dhis2/ui-core'

const color = theme.secondary600

export const Label = styled.span`
    cursor: pointer;
    user-select: none;
    line-height: 22px;
    white-space: nowrap;
    &:hover {
        color: ${color};
    }
    ${props =>
        props.isSelected &&
        css`
            color: ${color};
            cursor: unset;
        `}
`

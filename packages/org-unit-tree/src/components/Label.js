import styled, { css } from 'styled-components'
import { theme } from '@dhis2/ui-core'

export const Label = styled.span`
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

import styled from 'styled-components'
import { theme } from '@dhis2/ui-core'

export const IconContainer = styled.div`
    display: flex;
    align-items: center;
    height: 72px;
    width: 72px;
    border-radius: 50%;
    cursor: pointer;
    &:hover {
        fill: ${theme.primary600};
        background-color: rgba(0, 0, 0, 0.08);
    }
`

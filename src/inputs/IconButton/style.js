import styled from 'styled-components'
import { theme } from '@dhis2/ui-core'

export const IconContainer = styled.div`
    display: flex;
    align-items: center;
    margin-top: auto;
    margin-bottom: auto;
    height: 64px;
    width: 64px;
    border-radius: 50%;
    cursor: pointer;
    &:hover {
        fill: ${theme.primary600};
        background-color: rgba(0, 0, 0, 0.08);
    }
`

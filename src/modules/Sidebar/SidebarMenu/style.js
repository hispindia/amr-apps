import styled from 'styled-components'
import { MenuItem, colors } from '@dhis2/ui-core'

export const StyledMenuItem = styled(MenuItem)`
    padding-right: 12px !important;
    .label {
        width: 100%;
        display: flex;
        align-items: center;
    }
`

export const Title = styled.span`
    padding-left: 8px;
    padding-right: 12px;
`

export const Count = styled.span`
    padding: 4px;
    margin-left: auto;
    background: ${colors.grey300};
    border-radius: 4px;
`

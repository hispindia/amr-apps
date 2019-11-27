import styled from 'styled-components'
import { MenuItem, colors } from '@dhis2/ui-core'

export const StyledMenuItem = styled(MenuItem)`
    .link {
        padding-right: 12px;
    }
    .label {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: space-between;
    }
`

export const Count = styled.span`
    padding: 4px;
    background: ${colors.grey300};
    border-radius: 4px;
    margin-left: 8px;
`

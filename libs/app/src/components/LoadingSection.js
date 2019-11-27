import React from 'react'
import styled from 'styled-components'
import { Card, CircularLoader } from '@dhis2/ui-core'

const StyledCard = styled(Card)`
    display: flex !important;
    justify-content: center;
    align-items: center;
    margin-bottom: 16px;
    padding: 16px;
    height: unset !important;
`

export const LoadingSection = () => (
    <StyledCard>
        <CircularLoader />
    </StyledCard>
)

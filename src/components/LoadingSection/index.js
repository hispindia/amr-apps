import React from 'react'
import styled from 'styled-components'
import { Card, CircularLoader } from '@dhis2/ui-core'

export const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 16px;
`

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

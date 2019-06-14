import React from 'react'
import { Card, CircularLoader } from '@dhis2/ui-core'
import { MarginBottom } from 'styles'
import styled from 'styled-components'

export const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 16px;
`

export const ProgressSection = () => (
    <MarginBottom>
        <Card>
            <Container>
                <CircularLoader />
            </Container>
        </Card>
    </MarginBottom>
)

import React from 'react'
import { Card, CircularProgress } from '@dhis2/ui-core'
import { MarginBottom } from 'styles'
import { Container } from './style'

export const ProgressSection = () => (
    <MarginBottom>
        <Card>
            <Container>
                <CircularProgress />
            </Container>
        </Card>
    </MarginBottom>
)

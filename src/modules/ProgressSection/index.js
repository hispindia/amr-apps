import React from 'react'
import { Card, CircularLoader } from '@dhis2/ui-core'
import { MarginBottom } from 'styles'
import { Container } from './style'

export const ProgressSection = () => (
    <MarginBottom>
        <Card>
            <Container>
                <CircularLoader />
            </Container>
        </Card>
    </MarginBottom>
)

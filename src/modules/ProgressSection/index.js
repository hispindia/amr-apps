import React from 'react'
import { Card, CircularProgress } from '@dhis2/ui'
import { MarginBottom } from 'styles'
import { WithHeight } from './style'

export const ProgressSection = () => (
    <MarginBottom>
        <Card>
            <WithHeight>
                <CircularProgress overlay />
            </WithHeight>
        </Card>
    </MarginBottom>
)

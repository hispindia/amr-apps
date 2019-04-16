import React from 'react'
import styled from 'styled-components'
import { Card, CircularProgress } from '@dhis2/ui'
import { MarginBottom } from 'styles'

const WithHeight = styled.div`
    height: 100px;
`

export const ProgressSection = () => (
    <MarginBottom>
        <Card>
            <WithHeight>
                <CircularProgress overlay />
            </WithHeight>
        </Card>
    </MarginBottom>
)

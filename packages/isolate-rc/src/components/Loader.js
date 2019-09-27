import React from 'react'
import styled from 'styled-components'
import { CircularLoader } from '@dhis2/ui-core'

const Section = styled.section`
    height: 254px;
    display: flex;
    align-items: center;
    justify-content: center;
`

export const Loader = () => (
    <Section>
        <CircularLoader />
    </Section>
)

import React from 'react'
import styled from 'styled-components'
import { arrayOf, node, oneOfType, string } from 'prop-types'
import { Card } from '@dhis2/ui-core'
import { Heading } from 'styles'

export const StyledCard = styled(Card)`
    margin-bottom: 16px;
    padding: 16px;
    height: unset !important;
`

export const CardSection = ({ heading, children }) => (
    <StyledCard>
        <Heading>{heading}</Heading>
        {children}
    </StyledCard>
)

CardSection.prototypes = {
    heading: string.isRequired,
    children: oneOfType([node, arrayOf(node)]).isRequired,
}

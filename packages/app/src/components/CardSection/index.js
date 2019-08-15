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

const SectionButtons = styled.div`
    position: absolute;
    top: 38px;
    right: 32px;
`

export const CardSection = ({ heading, children, buttons }) => (
    <StyledCard>
        <Heading>{heading}</Heading>
        {!!buttons && <SectionButtons>{buttons}</SectionButtons>}
        {children}
    </StyledCard>
)

CardSection.prototypes = {
    heading: string.isRequired,
    children: oneOfType([node, arrayOf(node)]).isRequired,
}

import React from 'react'
import { arrayOf, object, string, oneOf } from 'prop-types'
import { Card } from '@dhis2/ui-core'
import { Heading, Margin, MarginBottom } from 'styles'
import { SectionContent } from '../SectionContent'

export const Section = ({
    heading,
    dataElements,
    childSections,
    renderType,
    duplicate,
}) => {
    const getProps = () => {
        dataElements = dataElements.filter(
            d => !elementProps[d].hide && !elementProps[d].hideWithValues
        )
        childSections = childSections.filter(
            cs => !cs.hide && !cs.hideWithValues
        )
        const childHalf = Math.ceil(childSections.length / 2)
        const half = Math.ceil(dataElements.length / 2 + childHalf)
        return { dataElements, childSections, half, childHalf }
    }

    return (
        <MarginBottom>
            <Card>
                <Margin>
                    <Heading>{heading}</Heading>
                    <SectionContent
                        renderType={renderType}
                        duplicate={duplicate}
                        {...getProps()}
                    />
                </Margin>
            </Card>
        </MarginBottom>
    )
}

Section.propTypes = {
    heading: string.isRequired,
    dataElements: arrayOf(string).isRequired,
    childSections: arrayOf(object).isRequired,
    renderType: string.isRequired,
    duplicate: oneOf([false, 'ERROR', 'WARNING']),
}

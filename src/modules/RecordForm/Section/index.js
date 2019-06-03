import React from 'react'
import {
    arrayOf,
    bool,
    func,
    object,
    objectOf,
    string,
    oneOf,
} from 'prop-types'
import { Card } from '@dhis2/ui-core'
import { Heading, Margin, MarginBottom } from 'styles'
import { SectionContent } from '../SectionContent'

export const Section = ({
    heading,
    dataElements,
    childSections,
    renderType,
    values,
    onChange,
    elementProps,
    completed,
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
                        values={values}
                        onChange={onChange}
                        elementProps={elementProps}
                        completed={completed}
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
    values: objectOf(string).isRequired,
    onChange: func.isRequired,
    elementProps: objectOf(object).isRequired,
    completed: bool,
    duplicate: oneOf([false, 'ERROR', 'WARNING']),
}

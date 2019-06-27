import React from 'react'
import { useSelector } from 'react-redux'
import { arrayOf, object, string } from 'prop-types'
import { CardSection } from 'components'
import { SectionContent } from './SectionContent'

export const Section = ({
    heading,
    dataElements,
    childSections,
    renderType,
}) => {
    const getProps = () => {
        const elementProps = useSelector(
            state => state.data.event.programStage.dataElements
        )

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
        <CardSection heading={heading}>
            <SectionContent renderType={renderType} {...getProps()} />
        </CardSection>
    )
}

Section.propTypes = {
    heading: string.isRequired,
    dataElements: arrayOf(string).isRequired,
    childSections: arrayOf(object).isRequired,
    renderType: string.isRequired,
}

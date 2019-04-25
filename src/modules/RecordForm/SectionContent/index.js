import React from 'react'
import { Grid } from '@material-ui/core'
import { DataElement } from '../DataElement'
import { ChildSection } from '../ChildSection'
import { arrayOf, func, number, object, objectOf, string } from 'prop-types'

export const SectionContent = ({
    dataElements,
    values,
    onChange,
    renderType,
    half,
    childHalf,
    childSections,
    errors,
}) => {
    const getDataElement = dataElement => (
        <DataElement
            key={dataElement.id}
            dataElement={dataElement}
            value={values[dataElement.id]}
            onChange={onChange}
            error={errors[dataElement.id]}
        />
    )

    const getChildSection = childSection => (
        <ChildSection
            key={childSection.id}
            childSection={childSection}
            values={values}
            onChange={onChange}
            errors={errors}
        />
    )

    if (dataElements.length > 0) {
        if (renderType === 'MATRIX')
            return (
                <Grid container spacing={0}>
                    {dataElements.map(dataElement => (
                        <Grid item key={dataElement.id}>
                            {getDataElement(dataElement)}
                        </Grid>
                    ))}
                </Grid>
            )
        else
            return (
                <Grid container spacing={0}>
                    <Grid item xs>
                        {dataElements
                            .slice(0, half)
                            .map(dataElement => getDataElement(dataElement))}
                    </Grid>
                    <Grid item xs>
                        {dataElements
                            .slice(half)
                            .map(dataElement => getDataElement(dataElement))}
                        {childSections &&
                            childSections.map(childSection =>
                                getChildSection(childSection)
                            )}
                    </Grid>
                </Grid>
            )
    }
    return (
        <Grid container spacing={0}>
            <Grid item xs>
                {childSections &&
                    childSections
                        .slice(0, childHalf)
                        .map(childSection => getChildSection(childSection))}
            </Grid>
            <Grid item xs>
                {childSections &&
                    childSections
                        .slice(childHalf)
                        .map(childSection => getChildSection(childSection))}
            </Grid>
        </Grid>
    )
}

SectionContent.propTypes = {
    dataElements: arrayOf(object).isRequired,
    values: objectOf(string).isRequired,
    onChange: func.isRequired,
    renderType: string.isRequired,
    half: number.isRequired,
    childHalf: number.isRequired,
    childSections: arrayOf(object).isRequired,
    errors: objectOf(string),
}

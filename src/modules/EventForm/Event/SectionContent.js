import React from 'react'
import { arrayOf, number, object, string } from 'prop-types'
import { Grid } from '@material-ui/core'
import { DataElement } from './DataElement'
import { ChildSection } from './ChildSection'

export const SectionContent = ({
    dataElements,
    half,
    childHalf,
    childSections,
    renderType,
}) => {
    const getChildSection = childSection => (
        <ChildSection key={childSection.id} childSection={childSection} />
    )

    if (dataElements.length > 0) {
        if (renderType === 'MATRIX')
            return (
                <Grid container spacing={0}>
                    {dataElements.map(id => (
                        <Grid item key={id}>
                            <DataElement key={id} id={id} />
                        </Grid>
                    ))}
                </Grid>
            )
        else
            return (
                <Grid container spacing={0}>
                    <Grid item xs>
                        {dataElements.slice(0, half).map(id => (
                            <DataElement key={id} id={id} />
                        ))}
                    </Grid>
                    <Grid item xs>
                        {dataElements.slice(half).map(id => (
                            <DataElement key={id} id={id} />
                        ))}
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
    dataElements: arrayOf(string).isRequired,
    half: number.isRequired,
    childHalf: number.isRequired,
    childSections: arrayOf(object).isRequired,
    renderType: string.isRequired,
}

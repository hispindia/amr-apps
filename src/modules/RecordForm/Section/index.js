import React from 'react'
import { Card } from '@dhis2/ui/core'
import { Heading, Margin, MarginSides, MarginBottom } from 'helpers'
import { SectionContent } from '../SectionContent'

export const Section = props => (
    <MarginBottom>
        <Card>
            <Margin>
                <MarginSides>
                    <Heading>{props.heading}</Heading>
                </MarginSides>
                <SectionContent
                    renderType={props.renderType}
                    dataElements={props.dataElements}
                    half={props.half}
                    childSections={props.childSections}
                    childHalf={props.childHalf}
                    completed={props.completed}
                    onChange={props.onChange}
                    optionSets={props.optionSets}
                    values={props.values}
                />
            </Margin>
        </Card>
    </MarginBottom>
)

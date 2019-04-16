import React, { useState, useEffect } from 'react'
import { Card } from '@dhis2/ui/core'
import { Heading, Text } from 'styles'
import {
    ButtonRow,
    Margin,
    MarginSides,
    MarginSidesSmall,
    MarginBottom,
    getDuplicates,
    _testResultDataElementId,
} from '../../'
import { ProgressSection } from '../ProgressSection'
import { RecordTable } from '../RecordTable'

export const DuplicationSection = props => {
    const [data, setData] = useState(null)
    const [clicked, setClicked] = useState(false)
    const { entityId, eventDate, days, organism, dataElements } = props

    useEffect(() => {
        const init = async () => {
            const response = await getDuplicates(
                entityId,
                eventDate,
                days,
                organism,
                dataElements
            )
            if (response.rows.length === 0) onClick('')
            else setData(response)
        }
        init()
    }, [])

    const onClick = value => {
        setClicked(true)
        props.onClick(value)
    }

    if (!data) return <ProgressSection />

    return (
        <MarginBottom>
            <MarginBottom>
                <Card>
                    <Margin>
                        <MarginSides>
                            <Heading>Possible duplicate record</Heading>
                        </MarginSides>
                    </Margin>
                    <MarginSides>
                        <MarginSides>
                            <MarginSidesSmall>
                                <Text>Is this record a duplicate?</Text>
                                <ButtonRow
                                    unspaced
                                    buttons={[
                                        {
                                            label: 'No',
                                            onClick: () => onClick(''),
                                            disabled: clicked,
                                            icon: 'clear',
                                            kind: 'basic',
                                            tooltip: 'No',
                                        },
                                        {
                                            label: 'Yes',
                                            onClick: () => onClick('Confirmed'),
                                            disabled: clicked,
                                            icon: 'done',
                                            kind: 'basic',
                                            tooltip: 'Yes',
                                        },
                                    ]}
                                />
                            </MarginSidesSmall>
                        </MarginSides>
                    </MarginSides>
                    <RecordTable data={data} title="" />
                </Card>
            </MarginBottom>
        </MarginBottom>
    )
}

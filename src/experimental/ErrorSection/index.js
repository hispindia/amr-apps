import React from 'react'
import { Card } from '@dhis2/ui/core/Card'
import {
    Margin,
    MarginBottom,
} from '../../helpers/helpers'

const messages = {
    event: 'This event does not exist.'
}

export const ErrorSection = props => (
    <MarginBottom>
        <MarginBottom>
            <Card>
                <Margin>
                    {messages[props.message]}
                </Margin>
            </Card>
        </MarginBottom>
    </MarginBottom>
)
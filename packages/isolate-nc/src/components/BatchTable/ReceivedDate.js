import React from 'react'
import { string, func } from 'prop-types'
import { DateInput } from '@hisp-amr/inputs'

export const ReceivedDate = ({ onChange, value, name }) => (
    <DateInput
        name={name}
        label=""
        value={value}
        onChange={onChange}
        disabled={!!value}
        small
    />
)

ReceivedDate.propTypes = {
    onChange: func.isRequired,
    value: string.isRequired,
    name: string.isRequired,
}

import React from 'react'
import { bool, func, string } from 'prop-types'
import styled from 'styled-components'
import { InputField } from '@dhis2/ui-core'
import { Row } from '../Row'

const StyledInputField = styled(InputField)`
    margin-right: 16px;
    width: 121px;
    &:last-child {
        margin-right: 0px;
    }
`

/**
 * Age input consisting of date picker and year/month/date input fields.
 */
export const AgeFields = ({ days, months, years, disabled, onChange }) => (
    <Row>
        <StyledInputField
            name="years"
            label="Years"
            value={years}
            onChange={onChange}
            disabled={disabled}
            type="number"
            dense
        />
        <StyledInputField
            name="months"
            label="Months"
            value={months}
            onChange={onChange}
            disabled={disabled}
            type="number"
            dense
        />
        <StyledInputField
            name="days"
            label="Days"
            value={days}
            onChange={onChange}
            disabled={disabled}
            type="number"
            dense
        />
    </Row>
)

AgeFields.propTypes = {
    years: string,
    months: string,
    days: string,
    disabled: bool,
    onChange: func.isRequired,
}

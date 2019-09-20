import React from 'react'
import { func, arrayOf, shape, string } from 'prop-types'
import styled from 'styled-components'
import { colors } from '@dhis2/ui-core'

const Option = styled.option`
    &:hover {
        background: ${colors.grey200};
    }
`

const StyledSelect = styled.select`
    height: 240px;
    flex: 1;
    border-width: 1px;
    border-style: solid;
    border-color: rgb(74, 87, 104);
    border-image: initial;
    border-radius: 4px;
    overflow-y: auto;
    outline: unset;
    &:focus {
        border-color: ${colors.teal400};
    }
`

export const MultiSelect = ({ onChange, options }) => (
    <StyledSelect onChange={onChange} multiple>
        {options.map(({ label, value }) => (
            <Option key={value} value={value}>
                {label}
            </Option>
        ))}
    </StyledSelect>
)

MultiSelect.propTypes = {
    onChange: func.isRequired,
    options: arrayOf(
        shape({
            label: string.isRequired,
            value: string.isRequired,
        })
    ).isRequired,
}

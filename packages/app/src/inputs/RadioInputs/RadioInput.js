import React from 'react'
import { bool, func, string } from 'prop-types'
import styled from 'styled-components'
import { Radio, colors } from '@dhis2/ui-core'
import { OptionSpacer } from 'styles'
import { APPROVED, RESEND, REJECTED } from 'constants/approval'

/**
 * Green valid.
 */
export const CustomRadio = styled(Radio)`
    .valid {
        fill: ${colors.green600} !important;
    }
`

/**
 * Input consisting of a group of radios.
 */
export const RadioInput = ({
    label,
    value,
    checked,
    onChange,
    disabled,
    single,
}) => {
    /**
     * Used to make radio deselectable.
     */
    const onClick = ({ target }) => {
        if (single) return
        if (value === target.value) onChange({ target: { value: '' } })
    }

    const onKeyDown = ({ key, target }) => {
        if (key !== 'Enter' || single) return
        const newValue = value !== target.value ? target.value : ''
        onChange({ target: { value: newValue } })
    }

    return (
        <OptionSpacer onClick={onClick} onKeyDown={onKeyDown}>
            <CustomRadio
                name={value}
                value={value}
                label={label}
                checked={checked}
                onChange={onChange}
                disabled={disabled}
                valid={value === APPROVED}
                warning={value === RESEND}
                error={value === REJECTED}
            />
        </OptionSpacer>
    )
}

RadioInput.propTypes = {
    label: string.isRequired,
    value: string.isRequired,
    checked: bool,
    onChange: func.isRequired,
    disabled: bool,
    single: bool,
}

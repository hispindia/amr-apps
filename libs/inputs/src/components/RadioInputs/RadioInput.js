import React from 'react'
import { bool, func, string } from 'prop-types'
import { Radio } from '@dhis2/ui-core'
import { OptionSpacer } from '../OptionSpacer'

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
            <Radio
                name={value}
                value={value}
                label={label}
                checked={checked}
                onChange={onChange}
                disabled={disabled}
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

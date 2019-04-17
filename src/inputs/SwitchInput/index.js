import React, { useState, useEffect } from 'react'
import { bool, func, string } from 'prop-types'
import Switch from '@dhis2/ui/core/Switch'

/**
 * Switch input.
 */
export const SwitchInput = props => {
    const [value, setValue] = useState(false)

    useEffect(() => {
        if (props.value !== value) setValue(props.value)
    }, [props.value])

    const onChange = (n, v) => {
        setValue(v)
        props.onChange(props.name, v)
    }

    return (
        <Switch
            name={props.name}
            checked={value}
            label={props.label}
            disabled={props.disabled}
            onChange={onChange}
        />
    )
}

SwitchInput.propTypes = {
    onChange: func.isRequired,
    name: string.isRequired,
    label: string.isRequired,
    disabled: bool,
    value: string,
}

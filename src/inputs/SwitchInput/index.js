import React, { useState, useEffect } from 'react'
import Switch from '@dhis2/ui/core/Switch'

/**
 * Switch input.
 */
export const SwitchInput = props => {
    const [value, setValue] = useState(false)

    const onChange = (name, value) => {
        setValue(value)
        props.onChange(props.name, value)
    }

    useEffect(() => {
        setValue(props.value)
    }, [props.value])

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

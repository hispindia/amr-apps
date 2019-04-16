import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
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
    onChange: PropTypes.func.isRequired,
    name: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    disabled: PropTypes.bool,
    value: PropTypes.string,
}

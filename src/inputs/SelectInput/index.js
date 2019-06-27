import React, { useState, useEffect } from 'react'
import { arrayOf, bool, func, shape, string } from 'prop-types'
import { SelectField } from '@dhis2/ui-core'
import { Input } from 'styles'

/**
 * Single select field.
 */
export const SelectInput = props => {
    const [value, setValue] = useState('')

    useEffect(() => {
        if (props.value != value) setValue(props.value)
    }, [props.value])

    const onChange = event => {
        const value = event.target.value
        setValue(value)
        props.onChange(props.name, value)
    }

    return (
        <Input>
            <SelectField
                name={props.name}
                value={value}
                label={props.label}
                help={props.disabled ? props.helperText : null}
                onChange={onChange}
                disabled={props.disabled}
                required={props.required}
                dense
            >
                {props.objects.map(o => (
                    <option key={o.value} value={o.value}>
                        {o.label}
                    </option>
                ))}
            </SelectField>
        </Input>
    )
}

SelectInput.propTypes = {
    onChange: func.isRequired,
    name: string.isRequired,
    label: string.isRequired,
    required: bool,
    disabled: bool,
    helperText: string,
    value: string,
    objects: arrayOf(
        shape({
            label: string.isRequired,
            value: string.isRequired,
        })
    ).isRequired,
}

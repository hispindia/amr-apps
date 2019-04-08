import React, { useState, useEffect } from 'react'
import SelectField from '@dhis2/ui/core/SelectField'
import { Input } from '../../helpers/helpers'

/**
 * Single select field.
 */
export const SelectInput = props => {
    const [value, setValue] = useState('')

    useEffect(() => {
        if (props.value != value) setValue(props.value)
    }, [props.value])

    const onChange = (n, v) => {
        setValue(v)
        props.onChange(props.name, v)
    }

    return (
        <Input>
            <SelectField
                name={props.name}
                kind="outlined"
                list={props.objects}
                value={value}
                label={props.label}
                help={props.disabled ? props.helperText : null}
                onChange={onChange}
                disabled={props.disabled}
                size="dense"
                required={props.required}
            />
        </Input>
    )
}

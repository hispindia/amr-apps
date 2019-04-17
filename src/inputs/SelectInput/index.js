import React, { useState, useEffect } from 'react'
import { arrayOf, bool, func, shape, string } from 'prop-types'
import SelectField from '@dhis2/ui/core/SelectField'
import { Input } from 'styles'
import { CustomSelectField } from './style'

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
            <CustomSelectField>
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
            </CustomSelectField>
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

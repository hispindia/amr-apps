import React, { useState, useEffect } from 'react'
import { bool, func, string } from 'prop-types'
import { DatePicker } from 'material-ui-pickers'
import { TextField } from './TextField'

/**
 * Date picker.
 */
export const DateInput = props => {
    const [value, setValue] = useState('')
    const [picker, setPicker] = useState(null)

    useEffect(() => {
        if (props.value !== value) setValue(props.value)
    }, [props.value])

    /**
     * Called on date picker input.
     * @param {string} - New date.
     */
    const setDate = date => {
        setValue(date)
        props.onChange(props.name, date.format('YYYY-MM-DD'))
    }

    const renderField = () => (
        <TextField
            id={props.name}
            label={props.label}
            value={value}
            required={props.required}
            disabled={props.disabled}
            warning={!props.error && props.warning}
            error={props.error}
            picker={picker}
        />
    )

    return (
        <DatePicker
            value={value}
            onChange={setDate}
            ref={setPicker}
            TextFieldComponent={renderField}
            minDate={props.minDate}
            maxDate={props.maxDate}
            disableFuture
        />
    )
}

DateInput.propTypes = {
    onChange: func.isRequired,
    name: string.isRequired,
    label: string.isRequired,
    required: bool,
    disabled: bool,
    value: string,
}

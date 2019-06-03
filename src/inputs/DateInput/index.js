import React, { useState, useEffect } from 'react'
import { bool, func, string } from 'prop-types'
import InputField from '@dhis2/ui/core/InputField'
import { DatePicker } from 'material-ui-pickers'
import dayjs from 'dayjs'
import { Input } from 'styles'

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

    /**
     * Opens date picker.
     * @param {Object} e - Event.
     */
    const openPicker = e => picker.open(e)

    /**
     * Opens date picker.
     * @param {Object} e - Event.
     */
    const onKeyPress = e => {
        if (e.key === 'Enter') picker.open(e)
    }

    /**
     * Gets input field used for date picker.
     * @returns {Component} Input field.
     */
    const getField = () => (
        <Input
            onClick={props.disabled ? null : openPicker}
            onKeyPress={props.disabled ? null : onKeyPress}
        >
            <InputField
                name={props.name}
                label={props.label}
                value={value !== '' ? dayjs(value).format('YYYY-MM-DD') : value}
                onChange={() => {}}
                kind="outlined"
                disabled={props.disabled}
                dense
                required={props.required}
                warning={!!props.warning}
                error={!!props.error}
            />
            {(props.error || props.warning) && (
                <Help warning={!!props.warning} error={!!props.error}>
                    {props.error ? props.error : props.warning}
                </Help>
            )}
        </Input>
    )

    return (
        <DatePicker
            value={value}
            onChange={setDate}
            TextFieldComponent={getField}
            disableFuture
            ref={node => setPicker(node)}
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

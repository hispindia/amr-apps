import React, { useState, useEffect } from 'react'
import { bool, func, string } from 'prop-types'
import { InputField } from '@dhis2/ui-core'
import { DatePicker } from 'material-ui-pickers'
import dayjs from 'dayjs'
import { Input, Label, MarginTop, Row } from 'styles'
import { StyledInputField } from './style'

/**
 * Age input consisting of date picker and year/month/date input fields.
 */
export const AgeInput = props => {
    const [value, setValue] = useState('')
    const [years, setYears] = useState('0')
    const [months, setMonths] = useState('0')
    const [days, setDays] = useState('0')
    const [picker, setPicker] = useState(null)

    useEffect(() => {
        if (!props.value) {
            setValue('')
            setYears('0')
            setMonths('0')
            setDays('0')
        } else if (props.value !== value) setValues(dayjs(props.value))
    }, [props.value])

    /**
     * Called on input from age fields.
     * @param {string} name - Field name.
     * @param {string} v - Value.
     */
    const onAge = async event => {
        const n = event.target.name
        let v = event.target.value
        const newValues = { value, years, months, days }

        if (!v) v = '0'
        v = parseInt(v)
        if (v < 0) return
        newValues[n] = v - newValues[n]

        newValues.value = (newValues.value
            ? dayjs(newValues.value)
            : dayjs()
        ).add(-newValues[n], n)
        setValues(newValues.value)
    }

    const setValues = date => {
        const now = dayjs()
        let newDate = date

        const years = now.diff(newDate, 'year')
        newDate = newDate.add(years, 'year')
        const months = now.diff(newDate, 'month')
        newDate = newDate.add(months, 'month')
        const days = now.diff(newDate, 'day')

        date = date.format('YYYY-MM-DD')
        setValue(date)
        setYears(years.toString())
        setMonths(months.toString())
        setDays(days.toString())
        if (date !== props.value) props.onChange(props.name, date)
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
        <MarginTop
            onClick={props.disabled ? null : openPicker}
            onKeyPress={props.disabled ? null : onKeyPress}
        >
            <InputField
                name={props.name}
                label="Date of Birth"
                value={value !== '' ? dayjs(value).format('YYYY-MM-DD') : value}
                onChange={() => {}}
                disabled={props.disabled}
                dense
            />
        </MarginTop>
    )

    return (
        <Input>
            <Label required={props.required}>{props.label}</Label>
            <Row wrapped>
                <StyledInputField
                    name="years"
                    label="Years"
                    value={years}
                    onChange={onAge}
                    disabled={props.disabled}
                    dense
                    type="number"
                />
                <StyledInputField
                    name="months"
                    label="Months"
                    value={months}
                    onChange={onAge}
                    disabled={props.disabled}
                    dense
                    type="number"
                />
                <StyledInputField
                    name="days"
                    label="Days"
                    value={days}
                    onChange={onAge}
                    disabled={props.disabled}
                    dense
                    type="number"
                />
            </Row>
            <DatePicker
                value={value}
                onChange={setValues}
                TextFieldComponent={getField}
                disableFuture
                ref={node => setPicker(node)}
            />
        </Input>
    )
}

AgeInput.propTypes = {
    onChange: func.isRequired,
    name: string.isRequired,
    label: string.isRequired,
    required: bool,
    disabled: bool,
    value: string,
}

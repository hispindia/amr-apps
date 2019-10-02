import React, { useState, useEffect } from 'react'
import { bool, func, string } from 'prop-types'
import dayjs from 'dayjs'
import { AgeFields } from './AgeFields'
import { DateOfBirth } from './DateOfBirth'
import { MinWidth } from '../MinWidth'
import { Label } from '../Label'

/**
 * Age input consisting of date picker and year/month/date input fields.
 */
export const AgeInput = props => {
    const [value, setValue] = useState('')
    const [years, setYears] = useState('0')
    const [months, setMonths] = useState('0')
    const [days, setDays] = useState('0')

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

    return (
        <MinWidth>
            <Label required={props.required}>{props.label}</Label>
            <AgeFields
                years={years}
                months={months}
                days={days}
                disabled={props.disabled}
                onChange={onAge}
            />
            <DateOfBirth
                name={props.name}
                value={value}
                disabled={props.disabled}
                onChange={setValues}
            />
        </MinWidth>
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

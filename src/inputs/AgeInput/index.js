import React, { useState, useEffect } from 'react'
import { bool, func, string } from 'prop-types'
<<<<<<< HEAD
import InputField from '@dhis2/ui/core/InputField'
import { DatePicker } from 'material-ui-pickers'
import dayjs from 'dayjs'
=======
import { Help, InputField } from '@dhis2/ui-core'
import { DatePicker, MuiPickersUtilsProvider } from 'material-ui-pickers'
import MomentUtils from '@date-io/moment'
import moment from 'moment'
>>>>>>> origin/ui-update
import { Input, Label, MarginTop, Row } from 'styles'
import { UnitContainer } from './style'

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
    const onAge = async (n, v) => {
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
<<<<<<< HEAD
=======
     * Called on input from age fields.
     * @param {string} name - Field name.
     * @param {string} v - Value.
     */
    const onAge = async event => {
        let v = event.target.value
        if (!v) v = '0'
        v = parseInt(v)
        console.log(moment())
        const unit = event.target.name
        const oldValue = value ? value : moment()
        console.log(oldValue.get(unit))
        const newValue = oldValue
            .add(oldValue.get(unit) - v, unit)
            .format('YYYY-MM-DD')
        /*switch (event.target.name) {
            case 'years':
                if (v < 0 || v > 118) return
                newValues.years = v
                break
            case 'months':
                if (v < 0 || v > 12 || (v === 12 && days > 0)) return
                newValues.months = v
                break
            case 'days':
                if (v < 0 || v > 31) return
                newValues.days = v
                break
            default:
                break
        }*/
        console.log('hi')

        /*newValues.value = moment()
            .add(-newValues.years, 'years')
            .add(-newValues.months, 'months')
            .add(-newValues.days, 'days')
            .format('YYYY-MM-DD')
        console.log(newValues)*/
        setValues(newValue)
        props.onChange(props.name, newValue)
    }

    /**
>>>>>>> origin/ui-update
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
<<<<<<< HEAD
                kind="outlined"
=======
>>>>>>> origin/ui-update
                disabled={props.disabled}
                dense
            />
        </MarginTop>
    )

    return (
        <Input>
            <Label required={props.required}>{props.label}</Label>
            <Row wrapped>
                <UnitContainer>
                    <InputField
                        name="years"
                        label="Years"
                        value={years}
                        onChange={onAge}
<<<<<<< HEAD
                        kind="outlined"
                        disabled={props.disabled}
                        size="dense"
                        type="number"
=======
                        disabled={props.disabled}
                        type="number"
                        dense
>>>>>>> origin/ui-update
                    />
                </UnitContainer>
                <UnitContainer>
                    <InputField
                        name="months"
                        label="Months"
                        value={months}
                        onChange={onAge}
<<<<<<< HEAD
                        kind="outlined"
                        disabled={props.disabled}
                        size="dense"
                        type="number"
=======
                        disabled={props.disabled}
                        type="number"
                        dense
>>>>>>> origin/ui-update
                    />
                </UnitContainer>
                <UnitContainer>
                    <InputField
                        name="days"
                        label="Days"
                        value={days}
                        onChange={onAge}
<<<<<<< HEAD
                        kind="outlined"
                        disabled={props.disabled}
                        size="dense"
                        type="number"
                    />
                </UnitContainer>
            </Row>
            <DatePicker
                value={value}
                onChange={setValues}
                TextFieldComponent={getField}
                openTo="year"
                views={['year', 'month', 'day']}
                disableFuture
                ref={node => setPicker(node)}
            />
=======
                        disabled={props.disabled}
                        type="number"
                        dense
                    />
                </UnitContainer>
            </Row>
            <MuiPickersUtilsProvider utils={MomentUtils}>
                <DatePicker
                    value={value}
                    onChange={setDate}
                    showTodayButton
                    TextFieldComponent={getField}
                    maxDate={moment()}
                    ref={node => setPicker(node)}
                />
            </MuiPickersUtilsProvider>
            {(props.error || props.warning) && (
                <Help warning={!!props.warning} error={!!props.error}>
                    {props.error ? props.error : props.warning}
                </Help>
            )}
>>>>>>> origin/ui-update
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

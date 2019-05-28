import React, { useState, useEffect } from 'react'
import { bool, func, string } from 'prop-types'
import { Help, InputField } from '@dhis2/ui-core'
import { DatePicker, MuiPickersUtilsProvider } from 'material-ui-pickers'
import MomentUtils from '@date-io/moment'
import moment from 'moment'
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
        } else if (props.value !== value) setValues(props.value)
    }, [props.value])

    const setValues = date => {
        date = moment(date)
        const now = moment()

        const years = now.diff(date, 'year')
        date.add(years, 'years')
        const months = now.diff(date, 'months')
        date.add(months, 'months')
        const days = now.diff(date, 'days')

        setValue(date.add(-months, 'months').add(-years, 'years'))
        setYears(years.toString())
        setMonths(months.toString())
        setDays(days.toString())
    }

    /**
     * Called on date picker input.
     * @param {string} - New date.
     */
    const setDate = date => {
        setValues(date)
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
                label={'Date of Birth'}
                value={value !== '' ? moment(value).format('LL') : value}
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
                <UnitContainer>
                    <InputField
                        name={'years'}
                        label={'Years'}
                        value={years}
                        onChange={onAge}
                        disabled={props.disabled}
                        type="number"
                        dense
                    />
                </UnitContainer>
                <UnitContainer>
                    <InputField
                        name={'months'}
                        label={'Months'}
                        value={months}
                        onChange={onAge}
                        disabled={props.disabled}
                        type="number"
                        dense
                    />
                </UnitContainer>
                <UnitContainer>
                    <InputField
                        name={'days'}
                        label={'Days'}
                        value={days}
                        onChange={onAge}
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

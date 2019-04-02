import React, { useState, useEffect } from 'react'
import InputField from '@dhis2/ui/core/InputField'
import { DatePicker, MuiPickersUtilsProvider } from 'material-ui-pickers'
import MomentUtils from '@date-io/moment'
import moment from 'moment'
import styled from 'styled-components'
import { RowW, Label, Input, MarginTop } from '../../helpers/helpers'

const UnitContainer = styled.div`
    margin-right: 16px;
    width: 70px;
`

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
        if (props.value !== value) setValues(props.value)
    }, [props.value])

    const setValues = date => {
        const age = moment.duration(moment().diff(date))
        setValue(date)
        setYears(age.years().toString())
        setMonths(age.months().toString())
        setDays(age.days().toString())
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
    const onAge = async (n, v) => {
        let newValues = { value, years, months, days }
        if (!v) v = '0'
        v = parseInt(v)
        switch (n) {
            case 'years':
                if (v < 0 || v > 118) return
                newValues.years = v
                break
            case 'months':
                if (v < 0 || v > 11) return
                newValues.months = v
                break
            case 'days':
                if (v < 0 || v > 31) return
                newValues.days = v
                break
            default:
                break
        }

        newValues.value = moment()
            .add(-newValues.years, 'years')
            .add(-newValues.months, 'months')
            .add(-newValues.days, 'days')
            .format('YYYY-MM-DD')
        setValues(newValues.value)
        props.onChange(props.name, newValues.value)
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
                kind={'outlined'}
                disabled={props.disabled}
                size='dense'
            />
        </MarginTop>
    )

    return (
        <Input>
            <Label required={props.required}>{props.label}</Label>
            <RowW>
                <UnitContainer>
                    <InputField
                        name={'years'}
                        label={'Years'}
                        value={years}
                        onChange={onAge}
                        kind={'outlined'}
                        disabled={props.disabled}
                        size='dense'
                    />
                </UnitContainer>
                <UnitContainer>
                    <InputField
                        name={'months'}
                        label={'Months'}
                        value={months}
                        onChange={onAge}
                        kind={'outlined'}
                        disabled={props.disabled}
                        size='dense'
                    />
                </UnitContainer>
                <UnitContainer>
                    <InputField
                        name={'days'}
                        label={'Days'}
                        value={days}
                        onChange={onAge}
                        kind={'outlined'}
                        disabled={props.disabled}
                        size='dense'
                    />
                </UnitContainer>
            </RowW>
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
        </Input>
    )
}

import React from 'react'
import { DatePicker, MuiPickersUtilsProvider } from 'material-ui-pickers'
import MomentUtils from '@date-io/moment'
import * as moment from 'moment'
import InputField from '@dhis2/ui/core/InputField'
import styled from 'styled-components'
import { RowW, Label, Input, MarginTop } from '../../helpers/helpers'

const UnitContainer = styled.div`
    margin-right: 16px;
    width: 70px;
`

/**
 * Age input consisting of date picker and year/month/date input fields.
 */
export class AgeInput extends React.Component {
    state = {
        value: '',
        years: '0',
        months: '0',
        days: '0',
        errorText: '',
    }

    componentDidMount = () => {
        if (this.props.value) {
            const age = moment.duration(moment().diff(this.props.value))
            this.setState({
                value: this.props.value,
                years: age.years().toString(),
                months: age.months().toString(),
                days: age.days().toString(),
            })
        }
    }

    componentWillReceiveProps = props => {
        if (this.state.value !== props.value) {
            const age = moment.duration(moment().diff(props.value))
            this.setState({
                value: props.value,
                years: age.years().toString(),
                months: age.months().toString(),
                days: age.days().toString(),
            })
        }
    }

    /**
     * Called on date picker input.
     * @param {string} - New date.
     */
    setDate = date => {
        const age = moment.duration(moment().diff(date))
        this.setState({
            value: date,
            years: age.years().toString(),
            months: age.months().toString(),
            days: age.days().toString(),
        })
        this.props.onChange(this.props.name, date.format('YYYY-MM-DD'))
    }

    /**
     * Opens date picker.
     * @param {Object} e - Event.
     */
    openPicker = e => {
        this.picker.open(e)
    }

    /**
     * Opens date picker.
     * @param {Object} e - Event.
     */
    onKeyPress = e => {
        if (e.key === 'Enter') this.picker.open(e)
    }

    /**
     * Called on input from age fields.
     * @param {string} name - Field name.
     * @param {string} v - Value.
     */
    onAge = async (name, v) => {
        let { value, years, months, days } = this.state
        if (!v) v = '0'
        v = parseInt(v)
        switch (name) {
            case 'years':
                if (v < 0 || v > 118) return
                years = v
                break
            case 'months':
                if (v < 0 || v > 11) return
                months = v
                break
            case 'days':
                if (v < 0 || v > 31) return
                days = v
                break
            default:
                break
        }

        value = moment()
            .add(-years, 'years')
            .add(-months, 'months')
            .add(-days, 'days')
        await this.setState({
            value: value.format('YYYY-MM-DD'),
            years: years.toString(),
            months: months.toString(),
            days: days.toString(),
        })
        this.props.onChange(this.props.name, value.format('YYYY-MM-DD'))
    }

    /**
     * Gets input field used for date picker.
     * @returns {Component} Input field.
     */
    getField = () => {
        return (
            <MarginTop
                onClick={this.props.disabled ? null : this.openPicker}
                onKeyPress={this.props.disabled ? null : this.onKeyPress}
            >
                <InputField
                    name={this.props.name}
                    label={'Date of Birth'}
                    value={
                        this.state.value !== ''
                            ? moment(this.state.value).format('LL')
                            : this.state.value
                    }
                    onChange={() => {}}
                    kind={'outlined'}
                    status={this.state.errorText === '' ? 'default' : 'error'}
                    help={this.state.errorText}
                    disabled={this.props.disabled}
                    size="dense"
                />
            </MarginTop>
        )
    }

    render() {
        return (
            <Input>
                <Label required={this.props.required}>{this.props.label}</Label>
                <RowW>
                    <UnitContainer>
                        <InputField
                            name={'years'}
                            label={'Years'}
                            value={this.state.years}
                            onChange={this.onAge}
                            kind={'outlined'}
                            disabled={this.props.disabled}
                            size="dense"
                        />
                    </UnitContainer>
                    <UnitContainer>
                        <InputField
                            name={'months'}
                            label={'Months'}
                            value={this.state.months}
                            onChange={this.onAge}
                            kind={'outlined'}
                            disabled={this.props.disabled}
                            size="dense"
                        />
                    </UnitContainer>
                    <UnitContainer>
                        <InputField
                            name={'days'}
                            label={'Days'}
                            value={this.state.days}
                            onChange={this.onAge}
                            kind={'outlined'}
                            disabled={this.props.disabled}
                            size="dense"
                        />
                    </UnitContainer>
                </RowW>
                <MuiPickersUtilsProvider utils={MomentUtils}>
                    <DatePicker
                        value={this.state.value}
                        onChange={this.setDate}
                        showTodayButton
                        TextFieldComponent={this.getField}
                        maxDate={moment()}
                        ref={node => {
                            this.picker = node
                        }}
                    />
                </MuiPickersUtilsProvider>
            </Input>
        )
    }
}

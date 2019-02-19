import React from 'react'
import { DatePicker, MuiPickersUtilsProvider } from 'material-ui-pickers'
import MomentUtils from '@date-io/moment'
import * as moment from 'moment'
import InputField from '@dhis2/ui/core/InputField'
import { Input } from '../../helpers/helpers'

/**
 * Date picker.
 */
export class DateInput extends React.Component {
    state = {
        value: '',
        errorText: '',
    }

    componentDidMount = () => {
        if (this.props.value) {
            this.setState({
                value: this.props.value,
            })
        }
    }

    componentWillReceiveProps = props => {
        if (
            this.state.value !== props.value &&
            (this.state.value !== '' && props.value !== null)
        ) {
            this.setState({
                value: props.value,
            })
        }
    }

    /**
     * Called on date picker input.
     * @param {string} - New date.
     */
    setDate = date => {
        this.setState({
            value: date,
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
     * Gets input field used for date picker.
     * @returns {Component} Input field.
     */
    getField = () => {
        return (
            <Input
                onClick={this.props.disabled ? null : this.openPicker}
                onKeyPress={this.props.disabled ? null : this.onKeyPress}
            >
                <InputField
                    name={this.props.name}
                    label={this.props.label}
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
                    required={this.props.required}
                />
            </Input>
        )
    }

    render() {
        return (
            <div>
                <MuiPickersUtilsProvider utils={MomentUtils}>
                    <DatePicker
                        value={this.state.value}
                        onChange={this.setDate}
                        showTodayButton
                        TextFieldComponent={this.getField}
                        ref={node => {
                            this.picker = node
                        }}
                    />
                </MuiPickersUtilsProvider>
            </div>
        )
    }
}

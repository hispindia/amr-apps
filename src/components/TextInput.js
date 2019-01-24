import React from 'react'
import InputField from '@dhis2/ui/core/InputField'
import _ from 'lodash'
import { isUnique } from '../api/api'

export class TextInput extends React.Component {
    state = {
        value: '',
        errorText: '',
        validating: false,
    }

    style = {
        position: 'absolute',
        right: 0,
        top: 20,
        zIndex: 1,
    }

    constructor(props) {
        super(props)
        // Will start searching after user has stopped typing for 1 second.
        this.passValue = _.debounce(this.passValue, 1000)
    }

    componentDidMount = () => {
        if (this.props.value) this.setState({ value: this.props.value })
    }

    componentWillReceiveProps = props => {
        if (this.state.value !== props.value)
            this.setState({ value: props.value })
    }

    passValue = async (name, value) => {
        const didValidate = await this.validate(value)
        this.setState({ errorText: didValidate })
        this.props.onChange(name, value)
    }

    /**
     * handles value change
     * @param newValue
     */
    setValue = (name, value) => {
        this.setState({ value: value })
        this.passValue(name, value)
    }

    /**
     * @param {String} value input value
     * @returns Appropriate error text. Empty if valid.
     */
    validate = async value => {
        let errorText = this.state.errorText
        if (this.props.required) {
            if (value === '' || value === null)
                errorText = 'This field is required'
            else errorText = ''
        }
        if (this.props.unique) {
            if (value !== '') {
                this.setState({ validating: true })
                if (!(await isUnique(this.props.name, value))) {
                    errorText = 'This field requires a unique value'
                    this.props.onUnique(this.props.name, false)
                } else {
                    errorText = ''
                    this.props.onUnique(this.props.name, true)
                }
                this.setState({ validating: false })
            }
        }
        return errorText
    }

    render() {
        return (
            <InputField
                required={this.props.required}
                name={this.props.name}
                label={this.props.label}
                value={this.state.value}
                onChange={this.setValue}
                kind={'outlined'}
                status={this.state.errorText === '' ? 'default' : 'error'}
                help={this.state.errorText}
                disabled={this.props.disabled}
                size="dense"
            />
        )
    }
}

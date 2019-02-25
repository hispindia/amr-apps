import React from 'react'
import InputField from '@dhis2/ui/core/InputField'
import _ from 'lodash'

/**
 * Textfield input.
 */
export class TextInput extends React.Component {
    state = {
        value: '',
        errorText: '',
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

    /**
     * Passes the value to parent component after 1 sec.
     */
    passValue = async (name, value) => {
        const didValidate = await this.validate(value)
        this.setState({ errorText: didValidate })
        this.props.onChange(name, value)
    }

    setValue = (name, value) => {
        this.setState({ value: value })
        this.passValue(name, value)
    }

    /**
     * @param {String} value input value
     * @returns Appropriate error text. Empty if valid.
     */
    validate = async value => {
        const { name, label, required, unique } = this.props
        let errorText = ''
        if (required && !value) errorText = 'This field is required'
        if (unique && value)
            if (!(await this.props.validateUnique(name, value, label)))
                errorText = 'This field requires a unique value'
        return errorText
    }

    render() {
        return (
            <div
                className={
                    this.props.backgroundColor
                        ? 'input ' + this.props.backgroundColor
                        : 'input'
                }
            >
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
            </div>
        )
    }
}

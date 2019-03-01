import React from 'react'
import SelectField from '@dhis2/ui/core/SelectField'
import { Input } from '../../helpers/helpers'

/**
 * Single select field.
 */
export class SelectInput extends React.Component {
    state = { value: '' }

    componentDidMount = async () => {
        if (this.props.value) {
            this.setState({ value: this.props.value })
        }
    }

    componentWillReceiveProps = props => {
        if (this.state.value !== props.value)
            this.setState({ value: props.value })
    }

    onChange = (name, value) => {
        this.setState({ value: value })
        this.props.onChange(this.props.name, value)
    }

    render() {
        return (
            <Input>
                <SelectField
                    name={this.props.name}
                    kind="outlined"
                    list={this.props.objects}
                    value={this.state.value}
                    label={this.props.label}
                    help={this.props.disabled ? this.props.helperText : null}
                    onChange={this.onChange}
                    disabled={this.props.disabled}
                    size="dense"
                    required={this.props.required}
                />
            </Input>
        )
    }
}

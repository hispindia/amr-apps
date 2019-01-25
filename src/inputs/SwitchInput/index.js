import React from 'react'
import Switch from '@dhis2/ui/core/Switch'

export class SwitchInput extends React.Component {
    state = { value: false }

    onChange = async (name, value) => {
        this.setState({ value: value })
        this.props.onChange(name, value)
    }

    render() {
        return (
            <Switch
                name={this.props.name}
                checked={this.state.value}
                label={this.props.label}
                disabled={this.props.disabled}
                onChange={this.onChange}
            />
        )
    }
}

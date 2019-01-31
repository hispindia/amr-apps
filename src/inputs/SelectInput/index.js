import React from 'react'
import SelectField from '@dhis2/ui/core/SelectField'

export class SelectInput extends React.Component {
    state = {
        value: '',
        labelWidth: 0,
    }

    componentDidMount = async () => {
        if (this.props.value) {
            this.setState({
                value: this.props.value,
            })
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
            <div className="input">
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
                />
            </div>
        )
    }
}

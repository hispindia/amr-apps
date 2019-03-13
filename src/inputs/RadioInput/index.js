import React from 'react'
import { Radio } from '@dhis2/ui/core'
import { RowW, Label, OptionSpacer, Input } from '../../helpers/helpers'

/**
 * Input consisting of a group of radios.
 */
export class RadioInput extends React.Component {
    state = {
        value: '',
    }

    componentDidMount = () => {
        this.initValue(this.props)
    }

    componentWillReceiveProps = props => {
        if (this.state.value !== props.value) this.initValue(props)
    }

    initValue = props => {
        if (props.objects.length === 1) this.onChange(props.objects[0].value)
        else if (props.value) this.setState({ value: props.value })
    }

    onChange = value => {
        this.setState({ value: value })
        this.props.onChange(this.props.name, value)
    }

    /**
     * Used to make radio deselectable.
     */
    onClick = event => {
        if (this.state.value === event.target.value) this.setState({ value: '' })
    }

    render() {
        return (
            <Input>
                <Label required={this.props.required}>{this.props.label}</Label>
                <RowW>
                    {this.props.objects.map(object => (
                        <OptionSpacer key={object.value} onClick={this.onClick}>
                            <Radio
                                key={object.value}
                                name={object.value}
                                value={object.value}
                                label={object.label}
                                checked={this.state.value === object.value}
                                onChange={this.onChange}
                                disabled={this.props.disabled}
                                status={
                                    object.value === 'Approved'
                                        ? 'valid'
                                        : object.value === 'Resend'
                                        ? 'warning'
                                        : object.value === 'Rejected'
                                        ? 'error'
                                        : 'default'
                                }
                            />
                        </OptionSpacer>
                    ))}
                </RowW>
            </Input>
        )
    }
}

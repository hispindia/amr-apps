import React from 'react'
import { Radio } from '@dhis2/ui/core'
import styled from 'styled-components'
import { RowW, Label, OptionSpacer } from '../../helpers/helpers'

const RadioGroup = styled.div`
    margin-left: 8px;
    margin-right: 8px;
    margin-top: -8px;
`

/**
 * Input consisting of a group of radios.
 */
export class RadioInput extends React.Component {
    state = {
        value: '',
    }

    componentDidMount = () => {
        if (this.props.value) this.setState({ value: this.props.value })
    }

    componentWillReceiveProps = props => {
        if (this.state.value !== props.value)
            this.setState({ value: props.value })
    }

    onChange = value => {
        this.setState({ value: value })
        this.props.onChange(this.props.name, value)
    }

    render() {
        return (
            <RadioGroup>
                <Label>
                    {this.props.label}
                    {this.props.required ? '*' : null}
                </Label>
                <RowW>
                    {this.props.objects.map(object => (
                        <OptionSpacer key={object.value}>
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
            </RadioGroup>
        )
    }
}

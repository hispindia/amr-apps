import React from 'react'
import { Checkbox } from '@dhis2/ui/core'
import styled from 'styled-components'
import { RowW, Label, OptionSpacer } from '../../helpers/helpers'

/**
 * Input consisting of a a group of checkboxes.
 */
export class CheckboxInput extends React.Component {
    state = {
        values: {},
    }

    componentDidMount = () => {
        if (this.props.values) this.setState({ values: this.props.values })
    }

    componentWillReceiveProps = props => {
        if (this.state.values !== props.values)
            this.setState({ values: props.values })
    }

    /**
     * Called on checkbox click.
     */
    onChange = (name, value) => {
        let values = { ...this.state.values }
        value = value ? 'true' : ''
        values[name] = value
        this.setState({ values: values })
        this.props.onChange(name, value)
    }

    render() {
        return (
            <div>
                <Label>
                    {this.props.label}
                    {this.props.required ? '*' : null}
                </Label>
                <RowW>
                    {Object.keys(this.props.objects).map(id => (
                        <OptionSpacer key={id}>
                            <Checkbox
                                name={id}
                                value={id}
                                label={this.props.objects[id].label}
                                checked={this.state.values[id] === 'true'}
                                onChange={this.onChange}
                                disabled={this.props.objects[id].disabled}
                            />
                        </OptionSpacer>
                    ))}
                </RowW>
            </div>
        )
    }
}

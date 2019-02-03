import React from 'react'
import { Checkbox } from '@dhis2/ui/core'
import { RowW, Label } from '../../helpers/helpers'

export class CheckboxInput extends React.Component {
    state = {
        values: {},
    }

    componentDidMount = () => {
        if (this.props.values) this.setState({ values: this.props.values })
    }

    componentWillReceiveProps = props => {
        'hello'
        if (this.state.values !== props.values)
            this.setState({ values: props.values })
    }

    onChange = (name, value) => {
        let values = { ...this.state.values }
        values[name] = value
        this.setState({ values: values })
        this.props.onChange(name, value)
    }

    render() {
        return (
            <div style={{ marginLeft: 8, marginRight: 8, marginTop: -8 }}>
                <Label>
                    {this.props.label}
                    {this.props.required ? '*' : null}
                </Label>
                <div className="checkboxes">
                    <RowW>
                        {Object.keys(this.props.objects).map(id => (
                            <div key={id} style={{ marginRight: 40 }}>
                                <Checkbox
                                    name={id}
                                    value={id}
                                    label={this.props.objects[id]}
                                    checked={this.state.values[id]}
                                    onChange={this.onChange}
                                    disabled={this.props.disabled}
                                />
                            </div>
                        ))}
                    </RowW>
                </div>
            </div>
        )
    }
}
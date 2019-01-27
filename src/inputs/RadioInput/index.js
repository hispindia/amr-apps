import React from 'react'
import { Radio } from '@dhis2/ui/core'
import { Text, Row } from '../../helpers/helpers'

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
            <div style={{ marginLeft: 8, marginRight: 8, marginTop: -8 }}>
                <Text>
                    {this.props.label}
                    {this.props.required ? '*' : null}
                </Text>
                <Row>
                    {this.props.objects.map(object => (
                        <div key={object.value} style={{ marginRight: 40 }}>
                            <Radio
                                key={object.value}
                                name={object.value}
                                value={object.value}
                                label={object.label}
                                checked={this.state.value === object.value}
                                onChange={this.onChange}
                                disabled={this.props.disabled}
                            />
                        </div>
                    ))}
                </Row>
            </div>
        )
    }
}

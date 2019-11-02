import React, { useState, useEffect } from 'react'
import { arrayOf, bool, func, shape, string } from 'prop-types'
import { Label } from '../Label'
import { Row } from '../Row'
import { MinWidth } from '../MinWidth'
import { RadioInput } from './RadioInput'

/**
 * Input consisting of a group of radios.
 */
export const RadioInputs = props => {
    const [value, setValue] = useState('')

    useEffect(() => {
        if (props.objects.length === 1 && props.value === '')
            props.onChange(props.name, props.objects[0].value)
        else if (props.value !== value) setValue(props.value)
    }, [props.value])

    const onChange = ({ target }) => {
        const value = target.value
        setValue(value)
        props.onChange(props.name, value)
    }

    return (
        <MinWidth>
            <Label required={props.required}>{props.label}</Label>
            <Row>
                {props.objects.map(object => (
                    <RadioInput
                        key={object.value}
                        label={object.label}
                        value={object.value}
                        checked={value === object.value}
                        onChange={onChange}
                        disabled={props.disabled}
                        single={props.objects.length === 1}
                    />
                ))}
            </Row>
        </MinWidth>
    )
}

RadioInputs.propTypes = {
    label: string.isRequired,
    onChange: func.isRequired,
    objects: arrayOf(
        shape({
            value: string.isRequired,
            label: string.isRequired,
        })
    ).isRequired,
    value: string,
    required: bool,
    disabled: bool,
}

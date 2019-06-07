import React, { useState, useEffect } from 'react'
import { arrayOf, bool, func, shape, string } from 'prop-types'
import { Input, Label, OptionSpacer, Row } from 'styles'
import { CustomRadio } from './style'

const status = value => {
    switch (value) {
        case 'Approved':
            return 'valid'
        case 'Resend':
            return 'warning'
        case 'Rejected':
            return 'error'
        default:
            return 'default'
    }
}

/**
 * Input consisting of a group of radios.
 */
export const RadioInput = props => {
    const [value, setValue] = useState('')

    useEffect(() => {
        if (props.objects.length === 1)
            onChange({ target: { value: props.objects[0].value } })
        else if (props.value !== value) setValue(props.value)
    }, [props.value])

    const onChange = event => {
        const value = event.target.value
        setValue(value)
        props.onChange(props.name, value)
    }

    /**
     * Used to make radio deselectable.
     */
    const onClick = event => {
        if (props.objects.length === 1) return
        if (value === event.target.value) onChange({ target: { value: '' } })
    }

    return (
        <Input>
            <Label required={props.required}>{props.label}</Label>
            <Row wrapped>
                {props.objects.map(object => (
                    <OptionSpacer key={object.value} onClick={onClick}>
                        <CustomRadio
                            key={object.value}
                            name={object.value}
                            value={object.value}
                            label={object.label}
                            checked={value === object.value}
                            onChange={onChange}
                            disabled={props.disabled}
                            valid={object.value === 'Approved'}
                            warning={object.value === 'Resend'}
                            error={object.value === 'Rejected'}
                            status={status(object.value)}
                        />
                    </OptionSpacer>
                ))}
            </Row>
        </Input>
    )
}

RadioInput.propTypes = {
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

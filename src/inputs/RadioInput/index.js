import React, { useState, useEffect } from 'react'
import { arrayOf, bool, func, shape, string } from 'prop-types'
import { Input, Label, OptionSpacer, Row } from 'styles'
import { APPROVED, RESEND, REJECTED } from 'constants/approval'
import { CustomRadio } from './style'

/**
 * Input consisting of a group of radios.
 */
export const RadioInput = props => {
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

    /**
     * Used to make radio deselectable.
     */
    const onClick = ({ target }) => {
        if (props.objects.length === 1) return
        if (value === target.value) onChange({ target: { value: '' } })
    }

    const onKeyDown = ({ key, target }) => {
        if (key !== 'Enter' || props.objects.length === 1) return
        const newValue = value !== target.value ? target.value : ''
        onChange({ target: { value: newValue } })
    }

    return (
        <Input>
            <Label required={props.required}>{props.label}</Label>
            <Row wrapped>
                {props.objects.map(object => (
                    <OptionSpacer
                        key={object.value}
                        onClick={onClick}
                        onKeyDown={onKeyDown}
                    >
                        <CustomRadio
                            key={object.value}
                            name={object.value}
                            value={object.value}
                            label={object.label}
                            checked={value === object.value}
                            onChange={onChange}
                            disabled={props.disabled}
                            valid={object.value === APPROVED}
                            warning={object.value === RESEND}
                            error={object.value === REJECTED}
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

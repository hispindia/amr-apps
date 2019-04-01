import React, { useState, useEffect } from 'react'
import { Radio } from '@dhis2/ui/core'
import { RowW, Label, OptionSpacer, Input } from '../../helpers/helpers'

/**
 * Input consisting of a group of radios.
 */
export const RadioInput = props => {
    const [value, setValue] = useState('')

    const onChange = v => {
        setValue(v)
        props.onChange(props.name, v)
    }

    /**
     * Used to make radio deselectable.
     */
    const onClick = event => {
        if (value === event.target.value) setValue('')
    }

    useEffect(() => {
        if (props.objects.length === 1) onChange(props.objects[0].value)
        else setValue(props.value)
    }, [props.value])

    return (
        <Input>
            <Label required={props.required}>{props.label}</Label>
            <RowW>
                {props.objects.map(object => (
                    <OptionSpacer key={object.value} onClick={onClick}>
                        <Radio
                            key={object.value}
                            name={object.value}
                            value={object.value}
                            label={object.label}
                            checked={value === object.value}
                            onChange={onChange}
                            disabled={props.disabled}
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
import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { Radio } from '@dhis2/ui/core'
import styled from 'styled-components'
import { RowW, Label, OptionSpacer, Input } from 'helpers'

/**
 * Green valid.
 */
const CustomRadio = styled.div`
    .ui_radio_valid-icon_ixvar:not(.ui_radio_disabled_ixvar) {
        color: var(--green600) !important;
    }
`

/**
 * Input consisting of a group of radios.
 */
export const RadioInput = props => {
    const [value, setValue] = useState('')

    useEffect(() => {
        if (props.objects.length === 1) onChange(props.objects[0].value)
        else if (props.value !== value) setValue(props.value)
    }, [props.value])

    const onChange = v => {
        setValue(v)
        props.onChange(props.name, v)
    }

    /**
     * Used to make radio deselectable.
     */
    const onClick = event => {
        if (value === event.target.value) onChange('')
    }

    return (
        <Input>
            <Label required={props.required}>{props.label}</Label>
            <RowW>
                {props.objects.map(object => (
                    <OptionSpacer key={object.value} onClick={onClick}>
                        <CustomRadio>
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
                        </CustomRadio>
                    </OptionSpacer>
                ))}
            </RowW>
        </Input>
    )
}

RadioInput.propTypes = {
    label: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    value: PropTypes.string,
    required: PropTypes.bool,
    disabled: PropTypes.bool,
    objects: PropTypes.arrayOf(
        PropTypes.shape({
            value: PropTypes.string.isRequired,
            label: PropTypes.string.isRequired,
        })
    ).isRequired,
}

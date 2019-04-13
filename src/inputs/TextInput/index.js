import React, { useState, useEffect } from 'react'
import InputField from '@dhis2/ui/core/InputField'
import styled, { css } from 'styled-components'
import { Input } from 'helpers'
import { debounced } from './debounced'

/**
 * Colored field background.
 */
export const CustomInputField = styled.div`
    ${props => {
        switch (props.color) {
            case 'red':
                return css`
                    .ui_inputfield_flatline_kvrmz {
                        background-color: rgba(255, 0, 0, 0.082) !important;
                    }
                `
            case 'yellow':
                return css`
                    .ui_inputfield_flatline_kvrmz {
                        background-color: rgba(255, 255, 0, 0.082) !important;
                    }
                `
            case 'green':
                return css`
                    .ui_inputfield_flatline_kvrmz {
                        background-color: rgba(0, 255, 0, 0.082) !important;
                    }
                `
            default:
                return null
        }
    }}
`

const errors = {
    required: 'This field is required',
    unique: 'This field requires a unique value',
}

/**
 * Textfield input.
 */
export const TextInput = props => {
    const [value, setValue] = useState('')
    const [errorText, setErrorText] = useState('')
    const [validating, setValidating] = useState(false)

    const debouncedValue = debounced(value, 2000)

    useEffect(() => {
        if (props.value !== value) setValue(props.value)
    }, [props.value])

    useEffect(() => {
        if (
            debouncedValue !== null &&
            debouncedValue === value &&
            debouncedValue !== props.value
        )
            passValue(debouncedValue)
    }, [debouncedValue])

    useEffect(() => {
        if (props.uniqueValid && errorText === errors.unique) setErrorText('')
    }, [props.uniqueValid])

    /**
     * Passes the value to parent component after 1 sec.
     */
    const passValue = async value => {
        const didValidate = await validate(value)
        setErrorText(didValidate)
        props.onChange(props.name, value)
    }

    /**
     * @param {String} value input value
     * @returns Appropriate error text. Empty if valid.
     */
    const validate = async value => {
        const { name, label, required, unique } = props
        let error = ''
        if (required && !value) error = errors.required
        if (unique && value) {
            setValidating(true)
            if (!(await props.validateUnique(name, value, label)))
                error = errors.unique
            setValidating(false)
        }
        return error
    }

    return (
        <Input>
            <CustomInputField color={props.color}>
                <InputField
                    required={props.required}
                    name={props.name}
                    label={props.label}
                    value={value}
                    onChange={(n, v) => setValue(v)}
                    kind={'outlined'}
                    status={
                        errorText !== ''
                            ? 'error'
                            : validating
                            ? 'warning'
                            : 'default'
                    }
                    help={
                        errorText !== ''
                            ? errorText
                            : validating
                            ? 'Validating'
                            : ''
                    }
                    disabled={props.disabled}
                    type={props.type}
                    size="dense"
                />
            </CustomInputField>
        </Input>
    )
}

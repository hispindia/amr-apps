import React, { useState, useEffect } from 'react'
import InputField from '@dhis2/ui/core/InputField'
import { debounced }  from '../../hooks'

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
        if (debouncedValue !== null && debouncedValue !== props.value) passValue(debouncedValue)
    }, [debouncedValue])

    /**
     * Passes the value to parent component after 1 sec.
     */
    const passValue = async (value) => {
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
        if (required && !value) error = 'This field is required'
        if (unique && value) {
            setValidating(true)
            if (!(await props.validateUnique(name, value, label)))
                error = 'This field requires a unique value'
            setValidating(false)
        }
        return error
    }

    return (
        <div
            className={
                props.backgroundColor
                    ? 'input ' + props.backgroundColor
                    : 'input'
            }
        >
            <InputField
                required={props.required}
                name={props.name}
                label={props.label}
                value={value}
                onChange={(n, v) => setValue(v)}
                kind={'outlined'}
                status={errorText !== '' ? 'error' : validating ? 'warning' : 'default'}
                help={errorText !== '' ? errorText : validating ? 'Validating' : ''}
                disabled={props.disabled}
                type={props.type}
                size="dense"
            />
        </div>
    )
}

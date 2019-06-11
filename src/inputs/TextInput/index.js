import React, { useEffect } from 'react'
import { bool, func, string } from 'prop-types'
import { Help } from '@dhis2/ui-core'
import { Input } from 'styles'
import { hash } from 'utils'
import { hook } from './hook'
import { types, texts } from './constants'
import { debounced } from './debounced'
import { StyledInputField } from './style'

/**
 * Textfield input.
 */
export const TextInput = props => {
    const [{ value, hashedValue, validating, error }, dispatch] = hook()
    const debouncedValue = debounced(value, 2000)

    useEffect(() => {
        if (props.value !== value && props.value !== hashedValue)
            dispatch({ type: types.VALUE_PROP, value: props.value })
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
        if (props.uniqueValid && error === texts.unique)
            dispatch({ type: types.SET_ERROR, value: props.error })
    }, [props.uniqueValid])

    /**
     * Passes the value to parent component after 1 sec.
     */
    const passValue = async value => {
        if (props.unique && value !== '') {
            value = hash(value)
            dispatch({ type: types.SET_HASHED_VALUE, value: value })
        }
        const didValidate = await validate(value)
        dispatch({ type: types.SET_ERROR, error: didValidate })
        props.onChange(props.name, value, props.unique)
    }

    /**
     * @param {String} value input value
     * @returns Appropriate error text. Empty if valid.
     */
    const validate = async value => {
        const { name, label, required, unique, validateUnique } = props
        let error
        if (required && !value) error = texts.required
        if (unique && validateUnique && value) {
            dispatch({ type: types.SET_VALIDATING, validating: true })
            if (!(await props.onValidation(name, value, label)))
                error = texts.unique
            dispatch({ type: types.SET_VALIDATING, validating: false })
        }
        return error
    }

    const onInput = event => {
        const value = event.target.value
        if (!validating && value.length < 128)
            dispatch({ type: types.SET_VALUE, value: value })
    }

    return (
        <Input>
            <StyledInputField
                required={props.required}
                name={props.name}
                label={props.label}
                value={value && value.length > 127 ? '' : value}
                onChange={onInput}
                loading={validating}
                warning={!!props.warning}
                error={!!error || !!props.error}
                help={
                    validating
                        ? texts.validate
                        : error
                        ? error
                        : props.error
                        ? props.error
                        : props.warning
                        ? props.warning
                        : ''
                }
                disabled={props.disabled}
                type={props.type}
                dense
                placeholder={
                    value && value.length > 127 ? '<Confidential>' : ''
                }
                color={props.color}
            />
            {(validating || error || props.error || props.warning) && (
                <Help
                    warning={!!props.warning}
                    error={!!error || !!props.error}
                >
                    {validating
                        ? texts.validate
                        : error
                        ? error
                        : props.error
                        ? props.error
                        : props.warning}
                </Help>
            )}
        </Input>
    )
}

TextInput.propTypes = {
    onChange: func.isRequired,
    name: string.isRequired,
    label: string.isRequired,
    required: bool,
    unique: bool,
    disabled: bool,
    value: string,
    valid: bool,
    warning: string,
    error: string,
    uniqueValid: bool,
    validateUnique: bool,
    onValidation: func,
}

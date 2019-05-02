import React, { useEffect } from 'react'
import { bool, func, string } from 'prop-types'
import InputField from '@dhis2/ui/core/InputField'
import { Input } from 'styles'
import { hash } from 'helpers'
import { hook } from './hook'
import { types, texts, statuses } from './constants'
import { debounced } from './debounced'
import { CustomInputField } from './style'

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

    const onInput = (n, v) => {
        if (!validating && v.length < 128)
            dispatch({ type: types.SET_VALUE, value: v })
    }

    return (
        <Input>
            <CustomInputField color={props.color}>
                <InputField
                    required={props.required}
                    name={props.name}
                    label={props.label}
                    value={value && value.length > 127 ? '' : value}
                    onChange={onInput}
                    kind={'outlined'}
                    status={
                        validating
                            ? statuses.warning
                            : error || props.error
                            ? statuses.error
                            : props.warning
                            ? statuses.warning
                            : statuses.default
                    }
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
                    size="dense"
                    placeholder={
                        value && value.length > 127 ? '<Confidential>' : ''
                    }
                />
            </CustomInputField>
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

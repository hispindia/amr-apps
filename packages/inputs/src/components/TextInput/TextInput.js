import React, { useEffect } from 'react'
import { bool, func, string } from 'prop-types'
import { Help } from '@dhis2/ui-core'
import { Input } from 'styles'
import { hash } from 'utils'
import { types, texts } from './constants'
import { useValues } from './useValues'
import { useDebounce } from './useDebounce'
import { StyledInputField } from './StyledInputField'

/**
 * Textfield input.
 */
export const TextInput = props => {
    const [{ value, hashedValue, validating, error }, dispatch] = useValues()
    const [debouncedValue, setDebouncedValue] = useDebounce(value, 2000)

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

    /**
     * Passes the value to parent component after 1 sec.
     */
    const passValue = async value => {
        if (props.unique && value !== '') {
            value = hash(value)
            dispatch({ type: types.SET_HASHED_VALUE, value: value })
        }
        await validate(value)
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
            await props.onValidation(name, value, label)
            dispatch({ type: types.SET_VALIDATING, validating: false })
        }
        return error
    }

    const onInput = ({ target }) => {
        const value = target.value
        if (!validating && value.length < 128)
            dispatch({ type: types.SET_VALUE, value: value })
    }

    const onKeyDown = ({ key }) => {
        if (key === 'Enter') setDebouncedValue(value)
    }

    const onBlur = () => setDebouncedValue(value)

    return (
        <Input onKeyDown={onKeyDown}>
            <StyledInputField
                required={props.required}
                name={props.name}
                label={props.label}
                value={value && value.length > 127 ? '' : value}
                onChange={onInput}
                onBlur={onBlur}
                loading={props.loading || validating}
                warning={!validating && !!props.warning}
                error={
                    !validating &&
                    (!!error || props.uniqueInvalid || !!props.error)
                }
                disabled={props.disabled}
                type={props.type}
                dense
                placeholder={
                    value && value.length > 127 ? '<Confidential>' : ''
                }
                color={props.color}
            />
            {(validating ||
                props.uniqueInvalid ||
                error ||
                props.error ||
                props.warning) && (
                <Help
                    warning={!validating && !!props.warning}
                    error={
                        !validating &&
                        (!!error || props.uniqueInvalid || !!props.error)
                    }
                >
                    {props.loading || validating
                        ? texts.validate
                        : props.uniqueInvalid
                        ? texts.unique
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
    uniqueInvalid: bool,
    validateUnique: bool,
    onValidation: func,
}

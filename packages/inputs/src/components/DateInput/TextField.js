import React from 'react'
import { bool, string, object, oneOfType } from 'prop-types'
import styled, { css } from 'styled-components'
import { InputField, Help } from '@dhis2/ui-core'
import dayjs from 'dayjs'
import { MinWidth } from '../MinWidth'

const Width = styled(MinWidth)`
    ${({ small }) => {
        if (small)
            return css`
                width: 100px;
                min-width: unset;
                input {
                    padding-left: 14px !important;
                }
            `
    }}
`

/**
 * Date picker.
 */
export const TextField = ({
    id,
    label,
    value,
    required,
    disabled,
    warning,
    error,
    picker,
    small,
}) => {
    /**
     * Opens date picker.
     * @param {Object} e - Event.
     */
    const openPicker = e => picker.open(e)

    /**
     * Opens date picker.
     * @param {Object} e - Event.
     */
    const onKeyPress = e => {
        if (e.key === 'Enter') picker.open(e)
    }

    return (
        <Width
            onClick={disabled ? null : openPicker}
            onKeyPress={disabled ? null : onKeyPress}
            small={small}
        >
            <InputField
                name={id}
                label={label}
                value={value !== '' ? dayjs(value).format('YYYY-MM-DD') : value}
                onChange={() => {}}
                disabled={disabled}
                dense
                required={required}
                warning={warning}
                error={error}
            />
            {(error || warning) && (
                <Help warning={warning} error={error}>
                    {error ? error : warning}
                </Help>
            )}
        </Width>
    )
}

TextField.propTypes = {
    id: string.isRequired,
    label: string.isRequired,
    value: oneOfType([string, object]),
    required: bool,
    disabled: bool,
    warning: string,
    error: string,
    picker: object,
}

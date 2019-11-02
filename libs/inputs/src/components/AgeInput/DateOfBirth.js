import React, { useState } from 'react'
import { bool, func, string } from 'prop-types'
import styled from 'styled-components'
import { InputField } from '@dhis2/ui-core'
import { DatePicker } from 'material-ui-pickers'
import dayjs from 'dayjs'

const Wrapper = styled.div`
    margin-top: 16px;
`

export const DateOfBirth = ({ name, value, disabled, onChange }) => {
    const [picker, setPicker] = useState(null)

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

    /**
     * Gets input field used for date picker.
     * @returns {Component} Input field.
     */
    const getField = () => (
        <Wrapper
            onClick={disabled ? null : openPicker}
            onKeyPress={disabled ? null : onKeyPress}
        >
            <InputField
                name={name}
                label="Date of Birth"
                value={value !== '' ? dayjs(value).format('YYYY-MM-DD') : value}
                onChange={() => {}}
                disabled={disabled}
                dense
            />
        </Wrapper>
    )

    return (
        <DatePicker
            value={value}
            onChange={onChange}
            TextFieldComponent={getField}
            ref={setPicker}
            disableFuture
        />
    )
}

DateOfBirth.propTypes = {
    name: string.isRequired,
    value: string,
    disabled: bool,
    onChange: func.isRequired,
}

import React from 'react'
import { useSelector } from 'react-redux'
import { func, object, string, bool } from 'prop-types'
import { Padding } from 'styles'
import { _sampleIdElementId } from 'api'
import { error, warning } from './constants'
import {
    TextInput,
    RadioInput,
    SelectInput,
    SwitchInput,
    DateInput,
} from 'inputs'

export const DataElement = ({
    dataElement,
    value,
    onChange,
    disabled,
    duplicate,
}) => {
    const optionSets = useSelector(state => state.metadata.optionSets)
    return (
        <Padding>
            {dataElement.optionSetValue ? (
                optionSets[dataElement.optionSet.id].length < 5 ? (
                    <RadioInput
                        objects={optionSets[dataElement.optionSet.id]}
                        name={dataElement.id}
                        label={dataElement.displayFormName}
                        value={value}
                        onChange={onChange}
                        required={dataElement.required}
                        disabled={dataElement.disabled || disabled}
                    />
                ) : (
                    <SelectInput
                        objects={optionSets[dataElement.optionSet.id]}
                        name={dataElement.id}
                        label={dataElement.displayFormName}
                        value={value}
                        onChange={onChange}
                        required={dataElement.required}
                        disabled={dataElement.disabled || disabled}
                    />
                )
            ) : dataElement.valueType === 'TRUE_ONLY' ? (
                <SwitchInput
                    name={dataElement.id}
                    label={dataElement.displayFormName}
                    checked={value}
                    onChange={onChange}
                    required={dataElement.required}
                    value={value}
                    disabled={dataElement.disabled || disabled}
                />
            ) : dataElement.valueType === 'DATE' ? (
                <DateInput
                    name={dataElement.id}
                    label={dataElement.displayFormName}
                    value={value}
                    required={dataElement.required}
                    onChange={onChange}
                    disabled={dataElement.disabled || disabled}
                />
            ) : (
                <TextInput
                    name={dataElement.id}
                    label={dataElement.displayFormName}
                    value={value}
                    required={dataElement.required}
                    onChange={onChange}
                    disabled={dataElement.disabled || disabled}
                    type={
                        dataElement.valueType === 'NUMBER' ? 'number' : 'text'
                    }
                    color={dataElement.color}
                    warning={
                        dataElement.id === _sampleIdElementId &&
                        duplicate === 'WARNING'
                            ? warning
                            : dataElement.warning
                    }
                    error={
                        dataElement.id === _sampleIdElementId &&
                        duplicate === 'ERROR'
                            ? error
                            : dataElement.error
                    }
                    unique={dataElement.id === _sampleIdElementId}
                />
            )}
        </Padding>
    )
}

DataElement.propTypes = {
    dataElement: object.isRequired,
    onChange: func.isRequired,
    value: string.isRequired,
    disabled: bool,
}

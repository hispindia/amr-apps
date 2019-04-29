import React, { useContext, memo } from 'react'
import { func, object, string, bool } from 'prop-types'
import { Padding } from 'styles'
import { MetadataContext } from 'contexts'
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
    error,
    disabled,
}) => {
    const { optionSets } = useContext(MetadataContext)

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
                    warning={dataElement.warning}
                    error={error ? error : dataElement.error}
                />
            )}
        </Padding>
    )
}

DataElement.propTypes = {
    dataElement: object.isRequired,
    onChange: func.isRequired,
    value: string.isRequired,
    error: string,
    disabled: bool,
}

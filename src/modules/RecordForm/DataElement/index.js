import React from 'react'
import PropTypes from 'prop-types'
import { Padding } from 'styles'
import {
    TextInput,
    RadioInput,
    SelectInput,
    SwitchInput,
    DateInput,
} from 'inputs'

export const DataElement = props => {
    const { dataElement, value, onChange, completed, optionSets } = props
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
                        disabled={dataElement.disabled || completed}
                    />
                ) : (
                    <SelectInput
                        objects={optionSets[dataElement.optionSet.id]}
                        name={dataElement.id}
                        label={dataElement.displayFormName}
                        value={value}
                        onChange={onChange}
                        required={dataElement.required}
                        disabled={dataElement.disabled || completed}
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
                    disabled={dataElement.disabled || completed}
                />
            ) : dataElement.valueType === 'DATE' ? (
                <DateInput
                    name={dataElement.id}
                    label={dataElement.displayFormName}
                    value={value}
                    required={dataElement.required}
                    onChange={onChange}
                    disabled={dataElement.disabled || completed}
                />
            ) : (
                <TextInput
                    name={dataElement.id}
                    label={dataElement.displayFormName}
                    value={value}
                    required={dataElement.required}
                    onChange={onChange}
                    disabled={dataElement.disabled || completed}
                    type={
                        dataElement.valueType === 'NUMBER' ? 'number' : 'text'
                    }
                    color={dataElement.color}
                    warning={dataElement.warning}
                    error={dataElement.error}
                />
            )}
        </Padding>
    )
}

DataElement.propTypes = {
    dataElement: PropTypes.object.isRequired,
    onChange: PropTypes.func.isRequired,
    value: PropTypes.string.isRequired,
    optionSets: PropTypes.object,
    completed: PropTypes.bool,
}

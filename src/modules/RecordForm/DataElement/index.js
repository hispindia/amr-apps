import React, { useContext } from 'react'
import { bool, func, object, string } from 'prop-types'
import { Padding } from 'styles'
import { MetadataContext, RecordContext } from 'contexts'
import {
    TextInput,
    RadioInput,
    SelectInput,
    SwitchInput,
    DateInput,
} from 'inputs'

export const DataElement = ({ dataElement, value, onChange, error }) => {
    const { optionSets } = useContext(MetadataContext)
    const { status } = useContext(RecordContext)
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
                        disabled={dataElement.disabled || status.completed}
                    />
                ) : (
                    <SelectInput
                        objects={optionSets[dataElement.optionSet.id]}
                        name={dataElement.id}
                        label={dataElement.displayFormName}
                        value={value}
                        onChange={onChange}
                        required={dataElement.required}
                        disabled={dataElement.disabled || status.completed}
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
                    disabled={dataElement.disabled || status.completed}
                />
            ) : dataElement.valueType === 'DATE' ? (
                <DateInput
                    name={dataElement.id}
                    label={dataElement.displayFormName}
                    value={value}
                    required={dataElement.required}
                    onChange={onChange}
                    disabled={dataElement.disabled || status.completed}
                />
            ) : (
                <TextInput
                    name={dataElement.id}
                    label={dataElement.displayFormName}
                    value={value}
                    required={dataElement.required}
                    onChange={onChange}
                    disabled={dataElement.disabled || status.completed}
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
}

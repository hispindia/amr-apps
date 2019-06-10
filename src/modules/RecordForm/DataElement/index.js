import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { string } from 'prop-types'
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
import { setEventValue } from '../../../actions'

// TODO: duplicate

export const DataElement = ({ duplicate, id }) => {
    const dispatch = useDispatch()
    const optionSets = useSelector(state => state.metadata.optionSets)
    const completed = useSelector(state => state.data.event.status.completed)
    const value = useSelector(state => state.data.event.values[id])
    const dataElement = useSelector(
        state => state.data.event.programStage.dataElements[id]
    )

    const onChange = (key, value) => dispatch(setEventValue(key, value))

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

DataElement.propTypes = { id: string.isRequired }

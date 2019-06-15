import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { string } from 'prop-types'
import { Padding } from 'styles'
import { _sampleIdElementId } from 'api'
import {
    TextInput,
    RadioInput,
    SelectInput,
    SwitchInput,
    DateInput,
} from 'inputs'
import { setEventValue } from '../../actions'
import * as DUPLICACY from '../../constants/duplicacy'

export const DataElement = props => {
    const id = props.id
    const dispatch = useDispatch()
    const optionSets = useSelector(state => state.metadata.optionSets)
    const completed = useSelector(state => state.data.event.status.completed)
    const value = useSelector(state => state.data.event.values[id])
    const color = useSelector(
        state => state.data.event.programStage.dataElements[id].color
    )
    const disabled = useSelector(
        state => state.data.event.programStage.dataElements[id].disabled
    )
    const displayFormName = useSelector(
        state => state.data.event.programStage.dataElements[id].displayFormName
    )
    const hide = useSelector(
        state => state.data.event.programStage.dataElements[id].hide
    )
    const optionSet = useSelector(
        state => state.data.event.programStage.dataElements[id].optionSet
    )
    const optionSetValue = useSelector(
        state => state.data.event.programStage.dataElements[id].optionSetValue
    )
    const required = useSelector(
        state => state.data.event.programStage.dataElements[id].required
    )
    const valueType = useSelector(
        state => state.data.event.programStage.dataElements[id].valueType
    )

    const duplicate =
        id === _sampleIdElementId &&
        useSelector(state => state.data.event.duplicate)

    const onChange = (key, value) => dispatch(setEventValue(key, value))

    if (hide) return null

    return (
        <Padding>
            {optionSetValue ? (
                optionSets[optionSet.id].length < 5 ? (
                    <RadioInput
                        objects={optionSets[optionSet.id]}
                        name={id}
                        label={displayFormName}
                        value={value}
                        onChange={onChange}
                        required={required}
                        disabled={disabled || completed}
                    />
                ) : (
                    <SelectInput
                        objects={optionSets[optionSet.id]}
                        name={id}
                        label={displayFormName}
                        value={value}
                        onChange={onChange}
                        required={required}
                        disabled={disabled || completed}
                    />
                )
            ) : valueType === 'TRUE_ONLY' ? (
                <SwitchInput
                    name={id}
                    label={displayFormName}
                    checked={value}
                    onChange={onChange}
                    required={required}
                    value={value}
                    disabled={disabled || completed}
                />
            ) : valueType === 'DATE' ? (
                <DateInput
                    name={id}
                    label={displayFormName}
                    value={value}
                    required={required}
                    onChange={onChange}
                    disabled={disabled || completed}
                />
            ) : (
                <TextInput
                    name={id}
                    label={displayFormName}
                    value={value}
                    required={required}
                    onChange={onChange}
                    disabled={disabled || completed}
                    type={valueType === 'NUMBER' ? 'number' : 'text'}
                    color={color}
                    unique={id === _sampleIdElementId}
                    error={
                        id === _sampleIdElementId &&
                        duplicate === DUPLICACY.ERROR
                            ? duplicate
                            : ''
                    }
                    warning={
                        id === _sampleIdElementId &&
                        duplicate === DUPLICACY.WARNING
                            ? duplicate
                            : ''
                    }
                    loading={
                        id === _sampleIdElementId &&
                        duplicate === DUPLICACY.CHECKING
                            ? true
                            : false
                    }
                />
            )}
        </Padding>
    )
}

DataElement.propTypes = {
    id: string.isRequired,
}

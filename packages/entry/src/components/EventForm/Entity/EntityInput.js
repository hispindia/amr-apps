import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import styled from 'styled-components'
import { setEntityValue, validateUnique } from '@hisp-amr/app'
import { TextInput, AgeInput, RadioInputs, SelectInput } from '@hisp-amr/inputs'

const Padding = styled.div`
    padding: 16px;
`

/**
 * Entity information section.
 */
export const EntityInput = ({ attribute }) => {
    const dispatch = useDispatch()
    const { optionSets } = useSelector(state => state.metadata)
    const { id: entityId, editing } = useSelector(state => state.data.entity)
    const id = attribute.trackedEntityAttribute.id
    const value = useSelector(state => state.data.entity.values[id])
    const unique = useSelector(state => state.data.entity.uniques[id])
    const modal = useSelector(state => state.data.entity.modal)
    const disabled = entityId && !editing ? true : false

    /**
     * Called on every input field change.
     */
    const onChange = (n, v) => {
        if (v !== value) dispatch(setEntityValue(n, v))
    }

    /**
     * Checks if unique value is valid.
     * @param {string} id - Attribute ID.
     * @param {string} value - Attribute value.
     * @param {string} label - Attribute label.
     */
    const onValidation = async (name, value, label) =>
        await dispatch(validateUnique(name, value, label))

    if (attribute.hide) return null

    return (
        <Padding>
            {attribute.trackedEntityAttribute.valueType === 'AGE' ? (
                <AgeInput
                    required={attribute.mandatory}
                    unique={attribute.trackedEntityAttribute.unique}
                    name={attribute.trackedEntityAttribute.id}
                    label={attribute.trackedEntityAttribute.displayName}
                    value={value}
                    onChange={onChange}
                    disabled={disabled}
                />
            ) : attribute.trackedEntityAttribute.optionSetValue ? (
                optionSets[attribute.trackedEntityAttribute.optionSet.id]
                    .length < 4 ? (
                    <RadioInputs
                        required={attribute.mandatory}
                        objects={
                            optionSets[
                                attribute.trackedEntityAttribute.optionSet.id
                            ]
                        }
                        name={attribute.trackedEntityAttribute.id}
                        label={attribute.trackedEntityAttribute.displayName}
                        value={value}
                        onChange={onChange}
                        disabled={disabled}
                    />
                ) : (
                    <SelectInput
                        required={attribute.mandatory}
                        objects={
                            optionSets[
                                attribute.trackedEntityAttribute.optionSet.id
                            ]
                        }
                        name={attribute.trackedEntityAttribute.id}
                        label={attribute.trackedEntityAttribute.displayName}
                        value={value}
                        onChange={onChange}
                        disabled={disabled}
                    />
                )
            ) : (
                <TextInput
                    required={attribute.mandatory}
                    unique={attribute.trackedEntityAttribute.unique}
                    uniqueInvalid={unique === false}
                    validateUnique
                    onValidation={onValidation}
                    name={attribute.trackedEntityAttribute.id}
                    label={attribute.trackedEntityAttribute.displayName}
                    value={value}
                    onChange={onChange}
                    disabled={
                        disabled ||
                        (attribute.trackedEntityAttribute.unique &&
                            (entityId || !!modal))
                    }
                    type={
                        attribute.trackedEntityAttribute.valueType === 'NUMBER'
                            ? 'number'
                            : 'text'
                    }
                />
            )}
        </Padding>
    )
}

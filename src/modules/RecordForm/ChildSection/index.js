import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { object } from 'prop-types'
import { Label, Padding } from 'styles'
import { CheckboxInput } from 'inputs'
import { DataElement } from '../DataElement'
import { ChildSectionLabel } from './style'
import { setEventValue } from '../../../actions'

// TODO: duplicate

/**
 * Gets the child section component.
 * @param {Object} childSection - Child section.
 * @returns {Component} Child section component.
 */
export const ChildSection = ({ childSection }) => {
    const dispatch = useDispatch()
    const dataElements = useSelector(
        state => state.data.event.programStage.dataElements
    )
    const completed = useSelector(state => state.data.event.status.completed)

    const onChange = (key, value) => dispatch(setEventValue(key, value))

    // If all, or all but one, of the data elements are of type TRUE_ONLY,
    // the section is rendered as a group of checkboxes.
    if (
        childSection.dataElements.filter(
            id => dataElements[id].valueType === 'TRUE_ONLY'
        ).length >
        childSection.dataElements.length - 2
    ) {
        const objects = {}
        const boxValues = {}
        childSection.dataElements
            .filter(id => dataElements[id].valueType === 'TRUE_ONLY')
            .forEach(id => {
                objects[id] = {
                    label: dataElements[id].displayFormName,
                    disabled: dataElements[id].disabled || completed,
                }
                boxValues[id] = useSelector(
                    state => state.data.event.values[id]
                )
            })
        return (
            <>
                <Padding>
                    <CheckboxInput
                        objects={objects}
                        name={childSection.name}
                        label={childSection.name}
                        values={boxValues}
                        onChange={onChange}
                    />
                </Padding>
                {childSection.dataElements
                    .filter(
                        id =>
                            dataElements[id].valueType === 'TEXT' &&
                            !dataElements[id].hide
                    )
                    .map(id => (
                        <DataElement key={id} id={id} />
                    ))}
            </>
        )
    }

    return (
        <>
            <ChildSectionLabel>
                <Label>{childSection.name}</Label>
            </ChildSectionLabel>
            {childSection.dataElements
                .filter(id => !dataElements[id].hide)
                .map(id => (
                    <DataElement key={id} id={id} />
                ))}
        </>
    )
}

ChildSection.propTypes = { childSection: object.isRequired }

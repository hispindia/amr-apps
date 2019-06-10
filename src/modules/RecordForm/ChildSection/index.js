import React from 'react'
import { object } from 'prop-types'
import { Label, Padding } from 'styles'
import { CheckboxInput } from 'inputs'
import { DataElement } from '../DataElement'
import { ChildSectionLabel } from './style'

// TODO: duplicate

/**
 * Gets the child section component.
 * @param {Object} childSection - Child section.
 * @returns {Component} Child section component.
 */
export const ChildSection = ({ childSection, duplicate }) => {
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
        const values = useSelector(state => state.data.event.values)
        const objects = {}
        const boxValues = {}
        childSection.dataElements
            .filter(id => dataElements[id].valueType === 'TRUE_ONLY')
            .forEach(id => {
                objects[id] = {
                    label: dataElements[id].displayFormName,
                    disabled: dataElements[id].disabled || completed,
                }
                boxValues[id] = values[id]
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
                        <DataElement
                            key={id}
                            dataElement={dataElements[id]}
                            onChange={onChange}
                            disabled={completed}
                            duplicate={duplicate}
                        />
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

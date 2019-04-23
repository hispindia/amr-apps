import React from 'react'
import { bool, func, object, objectOf, string } from 'prop-types'
import { Label, Padding } from 'styles'
import { CheckboxInput } from 'inputs'
import { DataElement } from '../DataElement'
import { ChildSectionLabel } from './style'

/**
 * Gets the child section component.
 * @param {Object} childSection - Child section.
 * @returns {Component} Child section component.
 */
export const ChildSection = ({
    childSection,
    completed,
    onChange,
    values,
    errors,
}) => {
    // If all, or all but one, of the data elements are of type TRUE_ONLY,
    // the section is rendered as a group of checkboxes.
    if (
        childSection.dataElements.filter(
            dataElement => dataElement.valueType === 'TRUE_ONLY'
        ).length >
        childSection.dataElements.length - 2
    ) {
        let objects = {}
        let boxValues = {}
        childSection.dataElements
            .filter(dataElement => dataElement.valueType === 'TRUE_ONLY')
            .forEach(dataElement => {
                objects[dataElement.id] = {
                    label: dataElement.displayFormName,
                    disabled: dataElement.disabled || completed,
                }
                boxValues[dataElement.id] = values[dataElement.id]
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
                        dataElement =>
                            dataElement.valueType === 'TEXT' &&
                            !dataElement.hide
                    )
                    .map(dataElement => (
                        <DataElement
                            key={dataElement.id}
                            dataElement={dataElement}
                            value={values[dataElement.id]}
                            onChange={onChange}
                            completed={completed}
                            error={errors[dataElement.id]}
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
                .filter(dataElement => !dataElement.hide)
                .map(dataElement => (
                    <DataElement
                        key={dataElement.id}
                        dataElement={dataElement}
                        value={values[dataElement.id]}
                        onChange={onChange}
                        completed={completed}
                        error={errors[dataElement.id]}
                    />
                ))}
        </>
    )
}

ChildSection.propTypes = {
    childSection: object.isRequired,
    onChange: func.isRequired,
    values: objectOf(string).isRequired,
    completed: bool,
    errors: objectOf(string),
}

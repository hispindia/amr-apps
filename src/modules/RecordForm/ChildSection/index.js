import React from 'react'
import { bool, func, object, objectOf, oneOf, string } from 'prop-types'
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
    onChange,
    values,
    elementProps,
    completed,
    duplicate,
}) => {
    // If all, or all but one, of the data elements are of type TRUE_ONLY,
    // the section is rendered as a group of checkboxes.
    if (
        childSection.dataElements.filter(
            id => elementProps[id].valueType === 'TRUE_ONLY'
        ).length >
        childSection.dataElements.length - 2
    ) {
        let objects = {}
        let boxValues = {}
        childSection.dataElements
            .filter(id => elementProps[id].valueType === 'TRUE_ONLY')
            .forEach(id => {
                objects[id] = {
                    label: elementProps[id].displayFormName,
                    disabled: elementProps[id].disabled || completed,
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
                            elementProps[id].valueType === 'TEXT' &&
                            !elementProps[id].hide
                    )
                    .map(id => (
                        <DataElement
                            key={id}
                            dataElement={elementProps[id]}
                            value={values[id]}
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
                .filter(id => !elementProps[id].hide)
                .map(id => (
                    <DataElement
                        key={id}
                        dataElement={elementProps[id]}
                        value={values[id]}
                        onChange={onChange}
                        disabled={completed}
                        duplicate={duplicate}
                    />
                ))}
        </>
    )
}

ChildSection.propTypes = {
    childSection: object.isRequired,
    values: objectOf(string).isRequired,
    onChange: func.isRequired,
    elementProps: objectOf(object).isRequired,
    completed: bool,
    duplicate: oneOf([false, 'ERROR', 'WARNING']),
}

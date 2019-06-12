/* eslint no-eval: 0 */

import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { bool } from 'prop-types'
import { Grid } from '@material-ui/core'
import { ModalPopup } from 'modules'
import { CardSection } from 'components'
import { Padding } from 'styles'
import { TextInput, AgeInput, RadioInput, SelectInput } from 'inputs'
import { ProgressSection } from '../ProgressSection'
import { CustomButtonRow } from './style'
import {
    setEntityValue,
    removeModal,
    validateUnique,
    resetEntity,
} from '../../actions'

/**
 * Entity information section.
 */
export const PersonForm = ({ showEdit }) => {
    const dispatch = useDispatch()
    const { optionSets, person } = useSelector(state => state.metadata)
    const { id, values, attributes, uniques, modal, editing } = useSelector(
        state => state.data.entity
    )

    //const [loading, setLoading] = useState(initLoading)
    const [half] = useState(
        Math.floor(person.trackedEntityTypeAttributes.length / 2)
    )

    /**
     * Called on every input field change.
     */
    const onChange = (name, value) => {
        if (values[name] === value) return
        dispatch(setEntityValue(name, value))
        //onPersonValue({ key: name, value: value })
    }

    /**
     * Checks if unique value is valid.
     * @param {string} id - Attribute ID.
     * @param {string} value - Attribute value.
     * @param {string} label - Attribute label.
     * @returns {boolean} True if valid.
     */
    const onValidation = async (name, value, label) =>
        await dispatch(validateUnique(name, value, label))

    const onModalClick = getEntity => dispatch(removeModal(getEntity))

    const onEditClick = () => dispatch(setEditing())

    const reset = () => dispatch(resetEntity())

    /**
     * Returns appropriate input type.
     */
    const getInput = attribute => {
        if (attribute.hide) return null

        const disabled = id && !editing ? true : false

        return (
            <Padding key={attribute.trackedEntityAttribute.id}>
                {attribute.trackedEntityAttribute.valueType === 'AGE' ? (
                    <AgeInput
                        required={attribute.mandatory}
                        unique={attribute.trackedEntityAttribute.unique}
                        name={attribute.trackedEntityAttribute.id}
                        label={attribute.trackedEntityAttribute.displayName}
                        value={values[attribute.trackedEntityAttribute.id]}
                        onChange={onChange}
                        disabled={disabled}
                    />
                ) : attribute.trackedEntityAttribute.optionSetValue ? (
                    optionSets[attribute.trackedEntityAttribute.optionSet.id]
                        .length < 4 ? (
                        <RadioInput
                            required={attribute.mandatory}
                            objects={
                                optionSets[
                                    attribute.trackedEntityAttribute.optionSet
                                        .id
                                ]
                            }
                            name={attribute.trackedEntityAttribute.id}
                            label={attribute.trackedEntityAttribute.displayName}
                            value={values[attribute.trackedEntityAttribute.id]}
                            onChange={onChange}
                            disabled={disabled}
                        />
                    ) : (
                        <SelectInput
                            required={attribute.mandatory}
                            objects={
                                optionSets[
                                    attribute.trackedEntityAttribute.optionSet
                                        .id
                                ]
                            }
                            name={attribute.trackedEntityAttribute.id}
                            label={attribute.trackedEntityAttribute.displayName}
                            value={values[attribute.trackedEntityAttribute.id]}
                            onChange={onChange}
                            disabled={disabled}
                        />
                    )
                ) : (
                    <TextInput
                        required={attribute.mandatory}
                        unique={attribute.trackedEntityAttribute.unique}
                        uniqueValid={
                            uniques &&
                            uniques[attribute.trackedEntityAttribute.id]
                        }
                        validateUnique
                        onValidation={onValidation}
                        name={attribute.trackedEntityAttribute.id}
                        label={attribute.trackedEntityAttribute.displayName}
                        value={values[attribute.trackedEntityAttribute.id]}
                        onChange={onChange}
                        disabled={
                            disabled ||
                            (id && attribute.trackedEntityAttribute.unique)
                        }
                        type={
                            attribute.trackedEntityAttribute.valueType ===
                            'NUMBER'
                                ? 'number'
                                : 'text'
                        }
                    />
                )}
            </Padding>
        )
    }

    if (!attributes) return <ProgressSection />

    return (
        <CardSection heading="Person">
            {modal && (
                <ModalPopup
                    heading="Person found"
                    text={
                        <span>
                            A person with the same <em>{modal.label}</em> is
                            already registered. Do you want to get this person?
                        </span>
                    }
                    label="Import"
                    icon="person"
                    primary
                    onClick={onModalClick}
                />
            )}
            {id && !editing && showEdit && (
                <CustomButtonRow
                    unspaced
                    buttons={[
                        {
                            label: 'Edit',
                            onClick: onEditClick,
                            icon: 'edit',
                            tooltip: 'Edit',
                            kind: 'secondary',
                            small: true,
                        },
                        {
                            label: 'Reset',
                            onClick: reset,
                            icon: 'clear',
                            tooltip: 'Reset',
                            kind: 'secondary',
                            small: true,
                        },
                    ]}
                />
            )}
            <Grid container spacing={0}>
                <Grid item xs>
                    {attributes.slice(0, half).map(a => getInput(a))}
                </Grid>
                <Grid item xs>
                    {attributes.slice(half).map(a => getInput(a))}
                </Grid>
            </Grid>
        </CardSection>
    )
}

PersonForm.prototypes = { showEdit: bool }

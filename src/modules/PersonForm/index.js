/* eslint no-eval: 0 */

import React, { useContext, useEffect, useState } from 'react'
import { bool, func } from 'prop-types'
import { Grid } from '@material-ui/core'
import { Card } from '@dhis2/ui/core'
import { Heading, Margin, MarginBottom, Padding } from 'styles'
import { getPersonValues, checkUnique } from 'api'
import { TextInput, AgeInput, RadioInput, SelectInput } from 'inputs'
import { MetadataContext, RecordContext } from 'contexts'
import { ModalPopup } from 'modules'
import { ProgressSection } from '../ProgressSection'
import { CustomButtonRow } from './style'

/**
 * Entity information section.
 */
export const PersonForm = ({ initLoading, showEdit, passValues }) => {
    const { optionSets, person } = useContext(MetadataContext)
    const { entityId, entityValues } = useContext(RecordContext)
    const [uniques, setUniques] = useState([])
    const [editing, setEditing] = useState(false)
    const [loading, setLoading] = useState(initLoading)
    const [modal, setModal] = useState(null)
    const [half] = useState(
        Math.floor(person.trackedEntityTypeAttributes.length / 2)
    )
    const [attributes, setAttributes] = useState(
        person.trackedEntityTypeAttributes
    )

    useEffect(() => {
        let newValues = { ...entityValues }
        let newAttributes = [...attributes]
        checkRules(newValues, newAttributes)
        setAttributes(newAttributes)
        onNewValues(newValues, entityId)
    }, [])

    useEffect(() => {
        const init = async () =>
            onNewValues(await getPersonValues(entityId), entityId)
        if (entityId) {
            init()
            setLoading(false)
        }
    }, [entityId])

    /**
     * Called on every input field change.
     */
    const onChange = (name, value) => {
        let newValues = { ...entityValues }
        if (newValues[name] === value) return
        newValues[name] = value
        onNewValues(newValues)
    }

    const onNewValues = (values, newEntityId, reset) => {
        let newAttributes = [...attributes]
        checkRules(values, newAttributes)
        setAttributes(newAttributes)
        passValues({
            values: values,
            id: reset ? null : newEntityId ? newEntityId : entityId,
            valid: validate(newAttributes, values, uniques),
        })
    }

    /**
     * Checks that no required field is empty and that uniques are validated.
     */
    const validate = (attr, values) => {
        if (
            attr.find(
                a => a.mandatory && values[a.trackedEntityAttribute.id] === ''
            )
        )
            return false
        for (let key in uniques) if (!uniques[key]) return false
        return true
    }

    /**
     * Checks if unique value is valid.
     * @param {string} id - Attribute ID.
     * @param {string} value - Attribute value.
     * @param {string} label - Attribute label.
     * @returns {boolean} True if valid.
     */
    const validateUnique = async (id, value, label) => {
        const newEntityId = await checkUnique(id, value)
        let uniques = { ...uniques }
        uniques[id] = newEntityId ? false : true
        setUniques(uniques)
        if (!newEntityId) return true
        setModal({
            id: id,
            label: label,
            value: value,
            entityId: newEntityId,
        })
        return false
    }

    const checkRules = (values, attr) => {
        person.rules.forEach(rule => {
            rule.programRuleActions.forEach(r => {
                switch (r.programRuleActionType) {
                    case 'SHOWOPTIONGROUP':
                        if (eval(rule.condition)) {
                            let affectedAttribute = attr.find(
                                attribute =>
                                    attribute.trackedEntityAttribute.id ===
                                    r.trackedEntityAttribute.id
                            )
                            if (
                                affectedAttribute.trackedEntityAttribute
                                    .optionSet.id !== r.optionGroup.id
                            ) {
                                affectedAttribute.trackedEntityAttribute.optionSet = {
                                    id: r.optionGroup.id,
                                }
                                // Only reset selected value if the options do not include current value.
                                if (
                                    !optionSets[
                                        affectedAttribute.trackedEntityAttribute
                                            .optionSet.id
                                    ].find(
                                        option =>
                                            option.value ===
                                            values[
                                                affectedAttribute
                                                    .trackedEntityAttribute.id
                                            ]
                                    )
                                )
                                    values[
                                        affectedAttribute.trackedEntityAttribute.id
                                    ] = ''
                            }
                        }
                        break
                    case 'HIDEFIELD':
                        const hide = eval(rule.condition)
                        let affectedAttribute = attr.find(
                            attribute =>
                                attribute.trackedEntityAttribute.id ===
                                r.trackedEntityAttribute.id
                        )
                        if (hide !== affectedAttribute.hide) {
                            affectedAttribute.hide = hide
                            if (hide)
                                values[
                                    affectedAttribute.trackedEntityAttribute.id
                                ] = ''
                        }
                        break
                    default:
                        break
                }
            })
        })
    }

    /**
     * Returns appropriate input type.
     */
    const getInput = attribute => {
        if (attribute.hide) return null

        const disabled = entityId && !editing ? true : false

        return (
            <Padding key={attribute.trackedEntityAttribute.id}>
                {attribute.trackedEntityAttribute.valueType === 'AGE' ? (
                    <AgeInput
                        required={attribute.mandatory}
                        unique={attribute.trackedEntityAttribute.unique}
                        name={attribute.trackedEntityAttribute.id}
                        label={attribute.trackedEntityAttribute.displayName}
                        value={
                            entityValues[attribute.trackedEntityAttribute.id]
                        }
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
                            value={
                                entityValues[
                                    attribute.trackedEntityAttribute.id
                                ]
                            }
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
                            value={
                                entityValues[
                                    attribute.trackedEntityAttribute.id
                                ]
                            }
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
                        validateUnique={validateUnique}
                        name={attribute.trackedEntityAttribute.id}
                        label={attribute.trackedEntityAttribute.displayName}
                        value={
                            entityValues[attribute.trackedEntityAttribute.id]
                        }
                        onChange={onChange}
                        disabled={
                            disabled ||
                            (entityId &&
                                attribute.trackedEntityAttribute.unique)
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

    const onModalClick = async yes => {
        let uniques = { ...uniques }
        uniques[modal.id] = yes
        setUniques(uniques)

        if (yes)
            onNewValues(await getPersonValues(modal.entityId), modal.entityId)

        setModal(null)
    }

    const reset = () => {
        setAttributes(person.trackedEntityTypeAttributes)
        setUniques([])
        setEditing(false)
        let values = {}
        Object.keys(entityValues).forEach(v => (values[v] = ''))
        onNewValues(values, null, true)
    }

    if (loading) return <ProgressSection />

    return (
        <MarginBottom>
            {modal && (
                <ModalPopup
                    heading="Person found"
                    text={
                        <span>
                            A person with <em>{modal.label}</em> {modal.value}{' '}
                            is already registered. Do you want to get this
                            person?
                        </span>
                    }
                    label="Import"
                    icon="person"
                    kind="primary"
                    onClick={onModalClick}
                />
            )}
            <Card>
                <Margin>
                    {entityId && !editing && showEdit && (
                        <CustomButtonRow
                            unspaced
                            buttons={[
                                {
                                    label: 'Edit',
                                    onClick: () => setEditing(true),
                                    icon: 'edit',
                                    tooltip: 'Edit',
                                    kind: 'secondary',
                                    size: 'small',
                                },
                                {
                                    label: 'Reset',
                                    onClick: reset,
                                    icon: 'clear',
                                    tooltip: 'Reset',
                                    kind: 'secondary',
                                    size: 'small',
                                },
                            ]}
                        />
                    )}
                    <Heading>Person</Heading>
                    <Grid container spacing={0}>
                        <Grid item xs>
                            {attributes.slice(0, half).map(a => getInput(a))}
                        </Grid>
                        <Grid item xs>
                            {attributes.slice(half).map(a => getInput(a))}
                        </Grid>
                    </Grid>
                </Margin>
            </Card>
        </MarginBottom>
    )
}

PersonForm.prototypes = {
    showEdit: bool.isRequired,
    passValues: func.isRequired,
    initLoading: bool,
}

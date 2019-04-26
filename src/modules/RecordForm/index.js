/* eslint no-eval: 0 */

import React, { useContext, useEffect } from 'react'
import { func } from 'prop-types'
import {
    updateEventValue,
    _testResultDataElementId,
    _sampleIdElementId,
} from 'api'
import { MarginBottom } from 'styles'
import { MetadataContext, RecordContext } from 'contexts'
import { ProgressSection } from '../'
import { hook } from './hook'
import { Section } from './Section'

const invalidReason = {
    required: 'A required field is empty',
    error: 'A field is invalid',
}

export const RecordForm = ({ passValues, checkDuplicate }) => {
    const [state, dispatch, types] = hook()
    const { optionSets } = useContext(MetadataContext)
    const {
        programStage,
        eventValues,
        rules,
        eventId,
        status,
        duplicate,
    } = useContext(RecordContext)

    useEffect(() => {
        if (!state.values) return
        const sampleId = state.values[_sampleIdElementId]
        if (sampleId) checkDuplicate(sampleId)
    }, [state.values && state.values[_sampleIdElementId]])

    useEffect(() => {
        init()
    }, [programStage, eventValues, status])

    useEffect(() => {
        if (!duplicate !== !state.errors[_sampleIdElementId])
            dispatch({ type: types.SET_ERROR, error: duplicate })
    }, [duplicate])

    const init = async () => {
        dispatch({ type: types.LOADING })
        checkRules(
            status.completed ? { ...eventValues } : eventValues,
            programStage.programStageSections,
            !status.completed
        )
        dispatch({ type: types.SET, programStage, values: eventValues })
        if (passValues)
            passValues(
                validateValues(programStage.programStageSections, eventValues)
            )
    }

    const onNewValue = (id, value) => updateEventValue(eventId, id, value)

    const onChange = (name, value) => {
        let values = { ...state.values }
        if (values[name] === value) return
        dispatch({ type: types.SET_VALUE, name, value })
        onNewValue(name, value)
        values[name] = value
        onNewValues(values)
    }

    const onNewValues = values => {
        let stage = { ...state.programStage }
        checkRules(values, stage.programStageSections, !status.completed)
        dispatch({ type: types.SET, programStage: stage, values })
        if (passValues)
            passValues(validateValues(stage.programStageSections, values))
    }

    const validateValues = (sections, values) => {
        for (let section of sections) {
            if (section.childSections) {
                const invalid = validateValues(section.childSections, values)
                if (invalid) return invalid
            }
            if (
                section.dataElements.find(
                    dataElement =>
                        dataElement.required && values[dataElement.id] === ''
                )
            )
                return invalidReason.required
            if (section.dataElements.find(dataElement => dataElement.error))
                return invalidReason.error
        }
        return false
    }

    const checkRules = (values, sections, pushChanges) => {
        /**
         * Gets the data element that is affected by rule.
         * @param {string} id - Data element id.
         * @returns {Object} Data element.
         */
        const findDataElement = id => {
            let dataElement
            for (let section of sections) {
                if (section.childSections)
                    for (let childSection of section.childSections) {
                        dataElement = childSection.dataElements.find(
                            element => element.id === id
                        )
                        if (dataElement) return dataElement
                    }
                dataElement = section.dataElements.find(
                    dataElement => dataElement.id === id
                )
                if (dataElement) return dataElement
            }
            return null
        }

        /**
         * Gets the section that is affected by rule.
         * @param {string} id - section id.
         * @returns {Object} Section.
         */
        const findSection = id => {
            let affectedSection
            for (let section of sections) {
                if (section.id === id) return section
                if (section.childSections) {
                    affectedSection = section.childSections.find(
                        childSection => childSection.id === id
                    )
                    if (affectedSection) return affectedSection
                }
            }
            return null
        }

        const getVariables = condition => {
            const variableDuplicated = condition.match(/values\[\'.*?\'\]/g)
            let variables = []
            if (!variableDuplicated) return
            variableDuplicated.forEach(duplicated => {
                if (variables.indexOf(duplicated) === -1)
                    variables.push(duplicated)
            })
            return variables.map(variable =>
                variable.substring(8, variable.length - 2)
            )
        }

        const getColor = value => {
            switch (value) {
                case 'Resistant':
                    return 'red'
                case 'Intermediate':
                    return 'yellow'
                case 'Susceptible':
                    return 'green'
                default:
                    return ''
            }
        }

        const setColors = (condition, affected, testValue) => {
            if (!affected.optionSetValue) return
            if (affected.optionSet.id !== _testResultDataElementId) return
            const variables = getVariables(condition)
            variables.forEach(variable => {
                let dataElement = findDataElement(variable)
                dataElement.color =
                    values[variable] === '' || !testValue
                        ? ''
                        : getColor(testValue)
            })
        }

        rules.forEach(rule => {
            rule.programRuleActions.forEach(r => {
                try {
                    const cond = eval(rule.condition)
                    let de = r.dataElement
                        ? findDataElement(r.dataElement.id)
                        : null
                    let s = r.programStageSection
                        ? findSection(r.programStageSection.id)
                        : null
                    switch (r.programRuleActionType) {
                        case 'SHOWOPTIONGROUP':
                            if (!cond || de.optionSet.id === r.optionGroup.id)
                                break
                            de.optionSet.id = r.optionGroup.id
                            // Only reset selected value if the options do not include current value.
                            if (
                                !optionSets[de.optionSet.id].find(
                                    option => option.value === values[de.id]
                                ) &&
                                values[de.id] !== ''
                            ) {
                                values[de.id] = ''
                                if (pushChanges) onNewValue(de.id, '')
                            }
                            break
                        case 'HIDEFIELD':
                            if (cond === de.hide) break
                            setColors(rule.condition, de)
                            de.hide = cond
                            if (values[de.id] !== '') {
                                values[de.id] = ''
                                if (pushChanges) onNewValue(de.id, '')
                            }
                            break
                        case 'HIDESECTION':
                            if (cond !== section.hide) s.hide = cond
                            break
                        case 'ASSIGN':
                            if (!cond) break
                            setColors(rule.condition, de, r.data)
                            // Assigning value.
                            if (values[de.id] !== r.data) {
                                values[de.id] = r.data
                                if (pushChanges) onNewValue(de.id, r.data)
                            }
                            de.disabled = true
                            break
                        case 'SHOWWARNING':
                            if (cond && de.warning !== r.content)
                                de.warning = r.content
                            else if (!cond && de.warning === r.content)
                                de.warning = null
                            break
                        case 'SHOWERROR':
                            if (cond && de.error !== r.content)
                                de.error = r.content
                            else if (!cond && de.error === r.content)
                                de.error = null
                            break
                        default:
                            break
                    }
                } catch {
                    console.warn('Failed to evaluate rule:', rule)
                }
            })
        })
    }

    if (state.loading) return <ProgressSection />
    return (
        <MarginBottom>
            {state.programStage.programStageSections
                .filter(section => !section.hide && !section.hideWithValues)
                .map(section => (
                    <Section
                        key={section.id}
                        heading={section.displayName}
                        renderType={section.renderType.DESKTOP.type}
                        dataElements={section.dataElements}
                        childSections={section.childSections}
                        onChange={onChange}
                        values={state.values}
                        errors={state.errors}
                    />
                ))}
        </MarginBottom>
    )
}

RecordForm.propTypes = {
    passValues: func.isRequired,
    checkDuplicate: func,
}

/* eslint no-eval: 0 */

import React, { useContext, useEffect, useCallback } from 'react'
import { func } from 'prop-types'
import { _testResultDataElementId, _sampleIdElementId } from 'api'
import { MarginBottom } from 'styles'
import { RecordContext } from 'contexts'
import { ProgressSection } from 'modules'
import { hook } from './hook'
import { Section } from './Section'

const invalidReason = {
    required: 'A required field is empty',
    error: 'A field is invalid',
}

export const RecordForm = ({ passValues, checkDuplicate }) => {
    const { programStage, eventValues, status, duplicate } = useContext(
        RecordContext
    )
    const [state, dispatch, types] = hook()

    useEffect(() => {
        if (state.runRules !== null) passValues(validateValues())
    }, [state.runRules])

    useEffect(() => {
        if (!state.values) return
        const sampleId = state.values[_sampleIdElementId]
        if (sampleId) checkDuplicate(sampleId)
    }, [state.values && state.values[_sampleIdElementId]])

    useEffect(() => {
        dispatch({
            type: types.INIT,
            programStage,
            values: eventValues,
            completed: status.completed,
        })
    }, [programStage, eventValues, status])

    useEffect(() => {
        if (!duplicate !== !state.errors[_sampleIdElementId])
            dispatch({ type: types.SET_ERROR, error: duplicate })
    }, [duplicate])

    const validateValues = (sections, values) => {
        if (!sections) sections = state.programStage.programStageSections
        if (!values) values = state.values

        for (let s of sections) {
            if (s.childSections) {
                const invalid = validateValues(s.childSections, values)
                if (invalid) return invalid
            }
            if (s.dataElements.find(d => d.required && values[d.id] === ''))
                return invalidReason.required
            if (s.dataElements.find(d => d.error)) return invalidReason.error
        }
        return false
    }

    const onChange = useCallback((name, value) =>
        dispatch({ type: types.SET_VALUE, name, value })
    )

    if (state.loading) return <ProgressSection />
    return (
        <MarginBottom>
            {state.programStage.programStageSections
                .filter(s => !s.hide && !s.hideWithValues)
                .map(s => (
                    <Section
                        key={s.id}
                        heading={s.displayName}
                        dataElements={s.dataElements}
                        childSections={s.childSections}
                        renderType={s.renderType.DESKTOP.type}
                        elementProps={state.programStage.dataElements}
                        onChange={onChange}
                        values={state.values}
                        errors={state.errors}
                        completed={status.completed}
                    />
                ))}
        </MarginBottom>
    )
}

RecordForm.propTypes = {
    passValues: func.isRequired,
    checkDuplicate: func,
}

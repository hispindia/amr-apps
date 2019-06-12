/* eslint no-eval: 0 */

import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { func } from 'prop-types'
import { _testResultDataElementId, _sampleIdElementId } from 'api'
import { MarginBottom } from 'styles'
import { ProgressSection } from 'modules'
//import { hook } from './hook'
import { Section } from './Section'

const invalidReason = {
    required: 'A required field is empty',
    error: 'A field is invalid',
}

export const RecordForm = ({ passValues, checkDuplicate }) => {
    /*const { programStage, values, status } = useSelector(
        state => state.data.event
    )*/
    const programStage = useSelector(state => state.data.event.programStage)

    //const [state, dispatch, types] = hook()

    /*useEffect(() => {
        if (state.runRules !== null)
            passValues(validateValues(programStage.programStageSections))
    }, [state.runRules])*/

    /*useEffect(() => {
        if (!state.values) return
        const sampleId = state.values[_sampleIdElementId]
        if (sampleId) checkDuplicate(sampleId)
    }, [state.values && state.values[_sampleIdElementId]])*/

    /*useEffect(() => {
        dispatch({
            type: types.INIT,
            programStage,
            values: values,
            completed: status.completed,
        })
    }, [programStage, values, status])*/

    /*const validateValues = sections => {
        for (const s of sections) {
            if (s.childSections) {
                const invalid = validateValues(s.childSections)
                if (invalid) return invalid
            }
            if (s.dataElements.find(d => d.required && values[d.id] === ''))
                return invalidReason.required
            if (s.dataElements.find(d => d.error)) return invalidReason.error
        }
        return false
    }*/

    //if (state.loading) return <ProgressSection />
    return (
        <>
            {programStage.programStageSections
                .filter(s => !s.hide && !s.hideWithValues)
                .map(s => (
                    <Section
                        key={s.id}
                        heading={s.displayName}
                        dataElements={s.dataElements}
                        childSections={s.childSections}
                        renderType={s.renderType.DESKTOP.type}
                    />
                ))}
        </>
    )
}

RecordForm.propTypes = {
    checkDuplicate: func,
}

import { TEST_RESULT_ELEMENT } from 'constants/dhis2'
import * as INVALID_REASONS from 'constants/invalidReasons'

export const eventRules = (
    values,
    stage,
    { rules, optionSets, pushChanges, updateValue }
) => {
    /**
     * Gets the section that is affected by rule.
     * @param {string} id - section id.
     * @returns {Object} Section.
     */
    const findSection = id => {
        for (const section of stage.programStageSections) {
            if (section.id === id) return section
            if (section.childSections) {
                const affectedSection = section.childSections.find(
                    childSection => childSection.id === id
                )
                if (affectedSection) return affectedSection
            }
        }
        return null
    }

    const getVariables = condition => {
        const variableDuplicated = condition.match(/values\[\'.*?\'\]/g)
        const variables = []
        if (!variableDuplicated) return
        variableDuplicated.forEach(duplicated => {
            if (variables.indexOf(duplicated) === -1) variables.push(duplicated)
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
        if (affected.optionSet !== TEST_RESULT_ELEMENT) return
        const variables = getVariables(condition)
        variables.forEach(id => {
            const dataElement = stage.dataElements[id]
            if (
                values[id] &&
                /\d/.test(dataElement.displayFormName) &&
                variables.find(
                    v => v !== dataElement.id && values[v] && values[v] !== ''
                )
            ) {
                dataElement.color = ''
                dataElement.warning = 'MIC is prioritized over DD'
            } else {
                dataElement.color =
                    values[id] === '' || !testValue ? '' : getColor(testValue)
                if ((dataElement.warning = 'MIC is prioritized over DD'))
                    dataElement.warning = ''
            }
        })
    }

    rules.forEach(rule => {
        rule.programRuleActions.forEach(r => {
            try {
                const cond = eval(rule.condition)
                const de = r.dataElement
                    ? stage.dataElements[r.dataElement.id]
                    : null
                const s = r.programStageSection
                    ? findSection(r.programStageSection.id)
                    : null
                switch (r.programRuleActionType) {
                    case 'SHOWOPTIONGROUP':
                        if (!cond || de.optionSet === r.optionGroup.id) break
                        de.optionSet = r.optionGroup.id
                        // Only reset selected value if the options do not include current value.
                        if (
                            !optionSets[de.optionSet].find(
                                option => option.value === values[de.id]
                            ) &&
                            values[de.id] !== ''
                        ) {
                            values[de.id] = ''
                            if (pushChanges) updateValue(de.id, '')
                        }
                        break
                    case 'HIDEFIELD':
                        if (cond === de.hide) break
                        setColors(rule.condition, de)
                        de.hide = cond
                        if (values[de.id] !== '') {
                            values[de.id] = ''
                            if (pushChanges) updateValue(de.id, '')
                        }
                        break
                    case 'HIDESECTION':
                        if (cond !== s.hide) s.hide = cond
                        break
                    case 'ASSIGN':
                        if (!cond) break
                        setColors(rule.condition, de, r.data)
                        // Assigning value.
                        if (values[de.id] !== r.data) {
                            values[de.id] = r.data
                            if (pushChanges) updateValue(de.id, r.data)
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
                        if (cond && de.error !== r.content) de.error = r.content
                        else if (!cond && de.error === r.content)
                            de.error = null
                        break
                    default:
                        break
                }
            } catch (error) {
                console.warn('Failed to evaluate rule:', rule, error)
            }
        })
    })

    const invalid = validateValues(
        stage.dataElements,
        values,
        stage.programStageSections
    )

    return [values, stage, invalid]
}

const validateValues = (elements, values, sections) => {
    const hasRequiredEmpty = dataElements =>
        dataElements.find(id => elements[id].required && values[id] === '')
    const hasError = dataElements => dataElements.find(id => elements[id].error)

    for (const s of sections) {
        if (s.childSections) {
            const invalid = validateValues(elements, values, s.childSections)
            if (invalid) return invalid
        }
        if (hasRequiredEmpty(s.dataElements))
            return INVALID_REASONS.REQUIRED_EMPTY
        if (hasError(s.dataElements)) return INVALID_REASONS.INVALID_FIELD
    }
    return false
}

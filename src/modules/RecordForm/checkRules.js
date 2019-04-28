import { _testResultDataElementId, _sampleIdElementId } from 'api'

export const checkRules = (
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
        let affectedSection
        for (let section of stage.programStageSections) {
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
        if (affected.optionSet.id !== _testResultDataElementId) return
        const variables = getVariables(condition)
        variables.forEach(id => {
            let dataElement = stage.dataElements[id]
            dataElement.color =
                values[id] === '' || !testValue ? '' : getColor(testValue)
        })
    }

    rules.forEach(rule => {
        rule.programRuleActions.forEach(r => {
            try {
                const cond = eval(rule.condition)
                let de = r.dataElement
                    ? stage.dataElements[r.dataElement.id]
                    : null
                let s = r.programStageSection
                    ? findSection(r.programStageSection.id)
                    : null
                switch (r.programRuleActionType) {
                    case 'SHOWOPTIONGROUP':
                        if (!cond || de.optionSet.id === r.optionGroup.id) break
                        de.optionSet.id = r.optionGroup.id
                        // Only reset selected value if the options do not include current value.
                        if (
                            !optionSets[de.optionSet.id].find(
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

    return { values, stage }
}

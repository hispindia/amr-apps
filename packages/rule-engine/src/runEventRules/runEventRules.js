import { getError } from './getError'
import { runEventAction } from './runEventAction'

/**
 *
 * @param {Object} values
 * @param {Object} programStage
 * @param {{
 *     programRules: Object[],
 *     optionSets: Object,
 *     pushChanges: Boolean,
 *     updateValue: Function
 * }} params
 */
export const runEventRules = (
    values,
    programStage,
    { programRules, optionSets, pushChanges, updateValue }
) => {
    programRules.forEach(rule => {
        rule.programRuleActions.forEach(action => {
            try {
                runEventAction(
                    values,
                    {
                        ...action,
                        condition: rule.condition,
                    },
                    {
                        stage: programStage,
                        optionSets,
                        pushChanges,
                        updateValue,
                    }
                )
            } catch (error) {
                console.warn('Failed to evaluate rule:', rule, error)
            }
        })
    })

    const error = getError(
        programStage.dataElements,
        values,
        programStage.programStageSections
    )

    return [values, programStage, error]
}

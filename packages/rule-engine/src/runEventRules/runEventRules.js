import { getError } from './getError'
import { runEventAction } from './runEventAction'

export const runEventRules = (
    values,
    stage,
    { rules, optionSets, pushChanges, updateValue }
) => {
    rules.forEach(rule => {
        rule.programRuleActions.forEach(action => {
            try {
                runEventAction(
                    values,
                    {
                        ...action,
                        condition: rule.condition,
                    },
                    {
                        stage,
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
        stage.dataElements,
        values,
        stage.programStageSections
    )

    return [values, stage, error]
}

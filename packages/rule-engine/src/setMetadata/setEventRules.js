import { programCondition } from './programCondition'

/**
 * Returns event program rules, excluding entity program rules,
 * sorted by priority.
 * @param {Object[]} programRules
 * @param {Object[]}
 */
export const setEventRules = programRules => {
    let eventRules = []
    programRules
        .filter(r =>
            r.programRuleActions.find(
                a => a.dataElement || a.programStageSection
            )
        )
        .forEach(d => {
            d.condition = programCondition(d.condition)
            eventRules.push(d)
        })
    eventRules = eventRules.sort((a, b) =>
        a.priority > b.priority || !a.priority ? 1 : -1
    )

    return eventRules
}

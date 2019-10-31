import { entityCondition } from './entityCondition'

/**
 * Returns program rules affecting entity attributes
 * @param {Object[]} programRules
 * @returns {Object[]}
 */
export const setentityRules = programRules => {
    const entityRules = []
    programRules
        .filter(r => r.programRuleActions.find(a => a.trackedEntityAttribute))
        .forEach(d => {
            if (!entityRules.find(rule => rule.name === d.name)) {
                d.condition = entityCondition(d.condition)
                entityRules.push(d)
            }
        })

    return entityRules
}

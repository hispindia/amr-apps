import { entityCondition } from './entityCondition'

/**
 * Returns program rules affecting entity attributes
 * @param {Object[]} programRules
 * @param {Object[]} programRuleVariables
 * @returns {Object[]}
 */
export const getEntityRules = (programRules, programRuleVariables) => {
    const entityRules = []
    programRules
        .filter(r => r.programRuleActions.find(a => a.trackedEntityAttribute))
        .forEach(r => {
            if (!entityRules.find(rule => rule.name === r.name)) {
                r.condition = entityCondition(
                    r.condition ? r.condition : 'true',
                    programRuleVariables
                )
                entityRules.push(r)
            }
        })

    return entityRules
}

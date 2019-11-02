import { programCondition } from './programCondition'

/**
 * Returns event program rules, excluding entity program rules,
 * sorted by priority.
 * @param {Object[]} programRules
 * @param {Object[]} programRuleVariables
 * @returns {Object[]}
 */
export const getEventRules = (programRules, programRuleVariables) =>
    programRules
        .filter(r =>
            r.programRuleActions.find(
                a => a.dataElement || a.programStageSection
            )
        )
        .map(r => ({
            ...r,
            condition: programCondition(r.condition, programRuleVariables),
        }))
        .sort((a, b) => (a.priority > b.priority || !a.priority ? 1 : -1))

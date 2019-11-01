import { initOptions } from './initOptions'

/**
 * @typedef {Object} Option
 * @property {string} label - Display name
 * @property {string} value - Code
 */

/**
 * @typedef {Object.<string, Option>} Options
 */

/**
 * @typedef {Object.<string, Options>} CompinedOptions
 */

/**
 * Returns an object with the option set id as the key,
 * and an object with the label and value as the value.
 * @param {Options} options
 * @param {Object[]} optionSets
 * @param {Object[]} optionGroups
 * @returns {CompinedOptions}
 */
export const initOptionSets = (options, optionSets, optionGroups) => {
    const optionsObjectified = initOptions(options)

    return Object.assign(
        ...optionGroups.map(os => ({
            [os.id]: os.options.map(o => optionsObjectified[o.id]),
        })),
        ...optionSets.map(os => ({
            [os.id]: os.options.map(o => optionsObjectified[o.id]),
        }))
    )
}

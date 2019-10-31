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
export const setOptionSets = (options, optionSets, optionGroups) =>
    Object.assign(
        ...optionGroups.map(os => ({
            [os.id]: os.options.map(o => options[o.id]),
        })),
        ...optionSets.map(os => ({
            [os.id]: os.options.map(o => options[o.id]),
        }))
    )

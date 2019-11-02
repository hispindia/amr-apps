/**
 * @typedef {Object} Option
 * @property {string} label - Display name
 * @property {string} value - Code
 */

/**
 * @typedef {Object.<string, Option>} Options
 */

/**
 * Returns an object with the option id as the key,
 * and an object with the label and value as the value.
 * @param {Object[]} options
 * @returns {Options}
 */
export const initOptions = options =>
    Object.assign(
        {},
        ...options.map(o => ({
            [o.id]: {
                label: o.displayName,
                value: o.code,
            },
        }))
    )

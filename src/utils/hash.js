import { createHash } from 'crypto'

/**
 * @param {String} input
 * @returns {String} Hashed input with sha512.
 */
export const hash = input =>
    createHash('sha512')
        .update(input)
        .digest('hex')

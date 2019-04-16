import { createHash } from 'crypto'

export const hash = input =>
    createHash('sha512')
        .update(input)
        .digest('hex')

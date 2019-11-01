import { initTrackedEntityAttributes } from './initTrackedEntityAttributes'
import * as input from '../__test__/input'
import * as output from '../__test__/output'

describe('initTrackedEntityAttributes', () => {
    it('returns attributes as an object', () => {
        const expected = output.trackedEntityAttributes
        const actual = initTrackedEntityAttributes(
            input.trackedEntityAttributes
        )

        return expect(actual).toEqual(expected)
    })
})

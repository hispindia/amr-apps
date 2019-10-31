import { setOptions } from './setOptions'
import { options, optionsObjectified } from '../__test__'

describe('setOptions', () => {
    it('sets the options', () => {
        const actual = setOptions(options)

        return expect(actual).toEqual(optionsObjectified)
    })
})

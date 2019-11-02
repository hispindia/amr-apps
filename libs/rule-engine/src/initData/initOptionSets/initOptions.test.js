import { initOptions } from './initOptions'
import { options, optionsObjectified } from '../../__test__'

describe('initOptions', () => {
    it('sets the options', () => {
        const actual = initOptions(options)

        return expect(actual).toEqual(optionsObjectified)
    })
})

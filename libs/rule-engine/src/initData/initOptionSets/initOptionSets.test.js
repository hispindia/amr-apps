import { initOptionSets } from './initOptionSets'
import {
    options,
    optionSets,
    optionGroups,
    optionSetsAndGroups,
} from '../../__test__'

describe('initOptionSets', () => {
    it('combines option sets and groups to a single object', () => {
        const actual = initOptionSets(options, optionSets, optionGroups)

        return expect(actual).toEqual(optionSetsAndGroups)
    })
})

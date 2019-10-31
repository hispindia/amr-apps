import { setOptionSets } from './setOptionSets'
import {
    optionsObjectified,
    optionSets,
    optionGroups,
    optionSetsAndGroups,
} from '../__test__'

describe('setOptionSets', () => {
    it('combines option sets and groups to a single object', () => {
        const actual = setOptionSets(
            optionsObjectified,
            optionSets,
            optionGroups
        )

        return expect(actual).toEqual(optionSetsAndGroups)
    })
})

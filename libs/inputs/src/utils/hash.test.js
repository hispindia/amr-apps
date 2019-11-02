import { hash } from './hash'

describe('hash', () => {
    const input = 'foobar'
    const output =
        '0a50261ebd1a390fed2bf326f2673c145582a6342d523204973d0219337f81616a8069b012587cf5635f6925f1b56c360230c19b273500ee013e030601bf2425'
    it('returns the correct value when the input is foobar', () => {
        expect(hash(input)).toEqual(output)
    })
})

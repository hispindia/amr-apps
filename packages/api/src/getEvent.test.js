import { getEvent } from './getEvent'

window.fetch = jest.fn()

describe('getEvent', () => {
    it('returns the data when everything is ok', () => {
        const expected = 'data'
        const response = {
            ok: true,
            json: () => expected,
        }
        window.fetch.mockImplementationOnce(() => Promise.resolve(response))
        return expect(getEvent('path')).resolves.toEqual(expected)
    })
})

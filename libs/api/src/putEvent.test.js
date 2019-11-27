import { putEvent } from './putEvent'

window.fetch = jest.fn()

describe('putEvent', () => {
    it('returns the data when everything is ok', () => {
        const expected = 'id'
        const response = {
            ok: true,
            json: () => expected,
        }
        window.fetch.mockImplementationOnce(() => Promise.resolve(response))
        return expect(putEvent('path', expected)).resolves.toEqual(expected)
    })
})

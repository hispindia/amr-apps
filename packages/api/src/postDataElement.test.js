import { postDataElement } from './postDataElement'

window.fetch = jest.fn()

describe('deleteEvent', () => {
    it('returns the data when everything is ok', () => {
        const expected = 'data'
        const response = {
            ok: true,
            json: () => expected,
        }
        window.fetch.mockImplementationOnce(() => Promise.resolve(response))
        return expect(postDataElement('path', expected)).resolves.toEqual(
            expected
        )
    })
})

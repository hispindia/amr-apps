import { postEvent } from './postEvent'

window.fetch = jest.fn()

describe('postEvent', () => {
    it('returns the data when everything is ok', () => {
        const expected = 'id'
        const response = {
            ok: true,
            json: () => ({
                response: {
                    importSummaries: [{ reference: 'id' }],
                },
            }),
        }
        window.fetch.mockImplementationOnce(() => Promise.resolve(response))
        return expect(postEvent('path', expected)).resolves.toEqual(expected)
    })
})

import { deleteEvent } from './deleteEvent'

window.fetch = jest.fn()

describe('deleteEvent', () => {
    it('returns the data when everything is ok', () => {
        const expected = 'data'
        const response = {
            ok: true,
            json: () => expected,
        }
        window.fetch.mockImplementationOnce(() => Promise.resolve(response))
        return expect(deleteEvent('path')).resolves.toEqual(expected)
    })
})

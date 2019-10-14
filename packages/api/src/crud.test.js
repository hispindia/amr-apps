import { get, put, post, del } from './crud'

window.fetch = jest.fn()

describe('get', () => {
    it('returns the data when everything is ok', () => {
        const expected = 'data'
        const response = {
            ok: true,
            json: () => expected,
        }
        window.fetch.mockImplementationOnce(() => Promise.resolve(response))
        return expect(get('path')).resolves.toEqual(expected)
    })
})

describe('put', () => {
    it('returns the data when everything is ok', () => {
        const expected = 'data'
        const response = {
            ok: true,
            json: () => expected,
        }
        window.fetch.mockImplementationOnce(() => Promise.resolve(response))
        return expect(put('path', expected)).resolves.toEqual(expected)
    })
})
describe('post', () => {
    it('returns the data when everything is ok', () => {
        const expected = 'data'
        const response = {
            ok: true,
            json: () => expected,
        }
        window.fetch.mockImplementationOnce(() => Promise.resolve(response))
        return expect(post('path', expected)).resolves.toEqual(expected)
    })
})

describe('del', () => {
    it('returns the data when everything is ok', () => {
        const expected = 'data'
        const response = {
            ok: true,
            json: () => expected,
        }
        window.fetch.mockImplementationOnce(() => Promise.resolve(response))
        return expect(del('path')).resolves.toEqual(expected)
    })
})

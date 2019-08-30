import { setBaseUrl, get, put, post, del } from './crud'

const baseUrl = 'https://amrtest.icmr.org.in/amr/api'

window.fetch = jest.fn()

describe('crud', () => {
    it('sets base url', () => {
        const expected = `${baseUrl}/`
        return expect(setBaseUrl(baseUrl)).toEqual(expected)
    })
})

describe('get', () => {
    it('calls fetch get and receive json', () => {
        const actual = { data: 'data' }
        const expected = {
            json: () => actual,
        }
        window.fetch.mockImplementationOnce(path => Promise.resolve(expected))
        return expect(get('path')).resolves.toEqual(actual)
    })
})

describe('put', () => {
    it('calls fetch put with the expected data', () => {
        const actual = 'config'
        const expected = { ok: true, config: actual }
        window.fetch.mockImplementationOnce((path, config) =>
            Promise.resolve({ ok: true, config })
        )
        return expect(put('path', actual)).resolves.toEqual(expected)
    })
})

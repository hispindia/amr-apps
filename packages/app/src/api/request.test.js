import { request } from './request'

describe('request', () => {
    it('returns the expected path', () => {
        const endpoint = 'path'
        const params = {
            fields: 'name,children[name]',
            filters: 'name:eq:123',
            order: 'name:asc',
            options: ['all=true'],
            paging: true,
        }
        const expected =
            'path?paging=true&fields=name,children[name]&filter=name:eq:123&order=name:asc&all=true'

        return expect(request(endpoint, params)).toEqual(expected)
    })
})

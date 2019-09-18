import { get, request } from '@hisp-amr/api'

export const getOrgUnits = async ({ root }) =>
    await get(
        request('organisationUnits', {
            order: 'level:asc',
            fields: ['children', 'displayName', 'id', 'path, code'],
            filter: `path:like:${root}`,
        })
    )

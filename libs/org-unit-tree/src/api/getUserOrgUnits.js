import { get, request } from '@hisp-amr/api'

export const getUserOrgUnits = async () =>
    await get(
        request('me', {
            fields: 'organisationUnits',
        })
    )

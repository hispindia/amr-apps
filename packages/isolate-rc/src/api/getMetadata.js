import { get, request } from '@hisp-amr/api'

export const getMetadata = async () =>
    await get(
        request('metadata', {
            fields: [
                'displayName',
                'id',
                'organisationUnits',
                'program',
                'options[code,name]',
            ],
            options: ['programs=true', 'optionSets=true'],
        })
    )

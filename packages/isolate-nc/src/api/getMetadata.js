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
                'access',
                'code',
                'formName',
            ],
            options: [
                'programs=true',
                'optionSets=true',
                'dataElements=true',
                'organisationUnits=true',
            ],
        })
    )

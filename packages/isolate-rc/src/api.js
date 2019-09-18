import { get } from '@hisp-amr/api'

export const getBatches = async orgUnitCode =>
    await get(`dataStore/id/${orgUnitCode}`)

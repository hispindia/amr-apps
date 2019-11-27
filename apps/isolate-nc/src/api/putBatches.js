import { put } from '@hisp-amr/api'

export const putBatches = async (orgUnitCode, data) =>
    await put(`dataStore/id/${orgUnitCode}`, data)

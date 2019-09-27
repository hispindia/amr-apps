import { post } from '@hisp-amr/api'

export const postBatches = async (orgUnitCode, data) =>
    await post(`dataStore/id/${orgUnitCode}`, data)

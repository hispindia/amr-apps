import { get } from '@hisp-amr/api'

export const getDataStoreKeys = async () => await get('dataStore/id')
